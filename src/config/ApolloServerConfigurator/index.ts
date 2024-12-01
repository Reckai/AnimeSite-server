import * as tq from 'type-graphql'
import resolvers from './resolvers'
import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import { authChecker  } from './AuthCheker/AuthCheker'
import session from 'express-session'
import { generateSessionKey } from '../../utils/genSessionId'

export const schemaConfig: tq.BuildSchemaOptions = {
        resolvers,
        scalarsMap: [{type: GraphQLScalarType, scalar: DateTimeResolver}],
        validate: {forbidUnknownValues: false},
        authChecker,
        
}

export const sessionConfig:session.SessionOptions = {
        name: 'qid',
        cookie: {
          maxAge: 2592000000, //long time
          httpOnly: true,
          secure: false ,  //cookie only works in https (we are developing)
          sameSite: 'lax'
        },
        
        genid: generateSessionKey,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: process.env.SESSION_SECRET || '123123',
      
}