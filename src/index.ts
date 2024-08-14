import 'reflect-metadata';
import express from 'express';
import {ApolloServer} from "@apollo/server"
import {GraphQLScalarType} from 'graphql'
import {DateTimeResolver} from 'graphql-scalars'
import * as tq from 'type-graphql'
import {context, Context} from './context'
import cors from 'cors';
import {AnimeResolver} from "./Animes/AnimeResolver";
import {AnimeListResolver} from "./AnimeList/AnimeListResolver";
import {UserResolver} from "./User/UserResolver";
import {CommentResolver} from "./Comment/CommentResolver";
import {authChecker} from "./AuthCheker/AuthCheker";
import {expressMiddleware} from "@apollo/server/express4";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import http from 'http';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import {AuthResolver, } from './Auth/Auth';
import jwt from "jsonwebtoken";
import { VerificationTokenResolver } from './VerificationToken/VerifictationTokenResolver';
import { createClient } from 'redis';
import session from 'express-session';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import Keyv from 'keyv';
import { generateSessionKey } from './utils/genSessionId';
const RedisStore = require("connect-redis").default




const app = express()
const keyv= new Keyv("redis://:@localhost:6379")
const server1 = async () => {

    const schema = await tq.buildSchema({
        resolvers: [AnimeResolver, AnimeListResolver, UserResolver, CommentResolver, AuthResolver
       ,VerificationTokenResolver ],
        scalarsMap: [{type: GraphQLScalarType, scalar: DateTimeResolver}],
        validate: {forbidUnknownValues: false},
        authChecker
    })
    const httpServer = http.createServer(app);
    const server = new ApolloServer<Context>({schema, plugins: [ApolloServerPluginDrainHttpServer({httpServer}), ApolloServerPluginCacheControl(),responseCachePlugin()],
    cache: new KeyvAdapter(keyv),
    
  })

    const redisClient = await createClient().connect()
    let redisStore = new RedisStore({
        client: redisClient,
        disableTouch: true,
      })
      

    await server.start()
    app.use(
        session({
            name: 'qid',
          store: redisStore,
          cookie: {
            maxAge: 2592000000, //long time
            httpOnly: true,
            secure: false,  //cookie only works in https (we are developing)
            sameSite: 'lax'
          },
        genid: generateSessionKey,
          resave: false, // required: force lightweight session keep alive (touch)
          saveUninitialized: false, // recommended: only save session when data exists
          secret: "keyboard cat",
        }),
      )
      
    app.use('/', cors<cors.CorsRequest>({
        origin: true, credentials: true,

    }), express.json(), expressMiddleware(server, {
        context: async ({req, res, }) => {

           const token = req.headers.authorization || ''

           const noBearer = token.split(' ')[1]
           if(!noBearer) return {prisma: context.prisma, token: '', res, req}
           const {userId} = jwt.decode(noBearer) as {userId: string}

           return {
                prisma: context.prisma, token: noBearer,  res,  req,userId
            }
        }
    })
    )

    await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);

}


server1()
