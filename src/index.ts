import 'reflect-metadata';
import express from 'express';
import {ApolloServer} from "@apollo/server"
import {GraphQLScalarType} from 'graphql'
import {DateTimeResolver} from 'graphql-scalars'
import * as tq from 'type-graphql'
import {context, Context} from './context'
import cors from 'cors';
import {AnimeResolver} from "./AnimeResolver";
import {AnimeListResolver} from "./AnimeList/AnimeListResolver";
import {UserResolver} from "./User/UserResolver";
import {CommentResolver} from "./Comment/CommentResolver";
import {authChecker} from "./AuthCheker/AuthCheker";
import {expressMiddleware} from "@apollo/server/express4";

import http from 'http';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';

import {AuthResolver, } from './Auth/Auth';
import jwt from "jsonwebtoken";
import { VerificationTokenResolver } from './VerificationToken/VerifictationTokenResolver';




const app = express()

const server1 = async () => {

    const schema = await tq.buildSchema({
        resolvers: [AnimeResolver, AnimeListResolver, UserResolver, CommentResolver, AuthResolver
       ,VerificationTokenResolver ],
        scalarsMap: [{type: GraphQLScalarType, scalar: DateTimeResolver}],
        validate: {forbidUnknownValues: false},
        authChecker
    })
    const httpServer = http.createServer(app);
    const server = new ApolloServer<Context>({schema, plugins: [ApolloServerPluginDrainHttpServer({httpServer})],})

    await server.start()
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
