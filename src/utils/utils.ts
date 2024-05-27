import jwt, {JwtPayload, TokenExpiredError} from 'jsonwebtoken';
import {getEnv} from "./JwtSecret";
import {IncomingMessage} from "node:http";
import {Role} from "../Roles/Role";
import {GraphQLError} from "graphql";
import {AuthenticationError} from "type-graphql";

export function getTokenPayload(token: string) {


    try {
        const decoded =  jwt.verify(token, getEnv('JWT_SECRET'))  as JwtPayload;
        console.log(decoded)
        return  decoded;
    } catch (err) {

        if (err instanceof TokenExpiredError) {


             return {
                 message: 'Token expired'
             }

        }
        throw new GraphQLError('Not authenticated');

    }
}

export function getDataFromToken( authToken: string): { userId: string, role: Role }  {

    if (authToken) {

        const { userId, role } = getTokenPayload(authToken);

        return {
            userId,
            role
        };
    }

    throw new GraphQLError('Not authenticated');
}


