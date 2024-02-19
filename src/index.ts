import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import {GraphQLScalarType} from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import * as tq from 'type-graphql'
import {context, Context} from './context'

import {AnimeResolver} from "./AnimeResolver";
import {AnimeListResolver} from "./AnimeList/AnimeListResolver";
import {UserResolver} from "./User/UserResolver";
import {CommentResolver} from "./Comment/CommentResolver";
import {authChecker} from "./AuthCheker/AuthCheker";



const app = async () => {


  const schema = await tq.buildSchema({
    resolvers: [ AnimeResolver, AnimeListResolver, UserResolver, CommentResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    validate: { forbidUnknownValues: false },
    authChecker
  })

  const server = new ApolloServer<Context>({ schema })

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const  token = req.headers.authorization || '2'

      return {
        prisma: context.prisma, token: token
      }
    }
  })
  console.log(`
🚀 Server ready at: ${url}
⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`
  )
}

app()
