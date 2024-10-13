import 'reflect-metadata';
import express from 'express';
import {ApolloServer} from "@apollo/server"
import * as tq from 'type-graphql'
import {context, Context} from './context'
import cors from 'cors';
import {expressMiddleware} from "@apollo/server/express4";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import http from 'http';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { createClient } from 'redis';
import session from 'express-session';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import Keyv from 'keyv';
import { schemaConfig, sessionConfig } from './config/ApolloServerConfigurator';
const RedisStore = require("connect-redis").default
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () =>{
  const app = express();
  const httpServer = http.createServer(app);
  const schema = await tq.buildSchema(schemaConfig)
  const redisClient = await createClient({url:process.env.REDIS_URL}).connect()
  let redisStore = new RedisStore({
      client: redisClient,
      disableTouch: true,
    })
  
  const keyv= new Keyv(process.env.REDIS_URL)
  const server = new ApolloServer<Context>({schema, plugins: [ApolloServerPluginDrainHttpServer({httpServer}), ApolloServerPluginCacheControl(),responseCachePlugin()],
  cache: new KeyvAdapter(keyv),

})


await server.start()

app.use(
    session({...sessionConfig, store: redisStore,}),
  )


app.use(
    cors<cors.CorsRequest>({
      origin: 'http://localhost:3000',
      credentials:true,            //access-control-allow-credentials:true
     
    }),
    express.json(), expressMiddleware(server, {
        context: async ({req, res, }) => {
           return {
                ...context, res, req,
            }
        }
    })
)

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/`);

}

startServer()
