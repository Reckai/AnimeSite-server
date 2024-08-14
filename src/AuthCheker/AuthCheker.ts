import {AuthChecker, AuthenticationError} from "type-graphql";
import {context, Context} from "../context";
import jwt from "jsonwebtoken";
import {Roles} from "../Roles/Roles";
import { Role } from "../Roles/Role";
import {createClient} from "redis";
import {Session} from "../SessionController/Session";



export const authChecker: AuthChecker<Context> =  async (

    { context: { prisma, token } }) => {
    // Здесь мы можем прочитать пользователя из контекста
    // и проверить его разрешения в базе данных против аргумента `roles`

    if(!token){
        return false
    }

    try{
        const redis = createClient()
        const redisClient = await  redis.connect();
        const sessionData = jwt.decode(token) as {userId: string, sessionId: string}
        let existingSession = await redisClient.get(`USER:${sessionData.sessionId}:${sessionData.userId}`)
        if(!existingSession){
            return false
        }
        await redisClient.quit()
const parsedSession = JSON.parse(existingSession) as Session
        return Roles.includes(parsedSession.role)
    }catch (e){
        return false
    }
    }
