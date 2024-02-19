import jwt, {JwtPayload} from 'jsonwebtoken';
import {getEnv} from "./JwtSecret";
import {IncomingMessage} from "node:http";
import {Role} from "../Roles/Role";

function getTokenPayload(token: string) {
    return jwt.verify(token, getEnv('JWT_SECRET'))  as JwtPayload;
}

export function getDataFromToken( authToken: string): { userId: string, role: Role }  {
    if (authToken) {
        const { userId, role } = getTokenPayload(authToken);
        return {
            userId,
            role
        };
    }

    throw new Error('Not authenticated');
}


