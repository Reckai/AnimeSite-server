// src/index.ts
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from "@apollo/server";
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'; // Import graphql-upload
import * as tq from 'type-graphql';
import { context, Context } from './context';
import cors from 'cors';
import { expressMiddleware } from "@apollo/server/express4";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { createClient } from 'redis';
import session from 'express-session';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import Keyv from 'keyv';
import { schemaConfig, sessionConfig } from './config/ApolloServerConfigurator';
const RedisStore = require("connect-redis").default;
import dotenv from 'dotenv';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    const app = express();
    const httpServer = http.createServer(app);
    app.use(graphqlUploadExpress({
        maxFileSize: 5 * 1024 * 1024,
        maxFiles: 1
      }));
    
    const schema = await tq.buildSchema(schemaConfig);
    const redisClient = await createClient({ url: process.env.REDIS_URL }).connect();
    let redisStore = new RedisStore({
        client: redisClient,
        disableTouch: true,
    });

    const keyv = new Keyv(process.env.REDIS_URL);
    const server = new ApolloServer<Context>({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginCacheControl(),
            responseCachePlugin()
        ],
        cache: new KeyvAdapter(keyv),
    });

    
    await server.start();

    app.use(
        session({ ...sessionConfig, store: redisStore }),
    );

    app.use(
        '/graphql',
        cors<cors.CorsRequest>({
            origin: 'http://localhost:3000',
            credentials: true,
        }),
        express.json(),
       
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                return {
                    ...context, res, req,
                };
            }
        })
    );
    app.use('/images', express.static('public/images'));

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
}

startServer();