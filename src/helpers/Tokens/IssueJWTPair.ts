
import jwt from "jsonwebtoken";
import{ v4 as uuid} from "uuid";



import {Role} from "../../Roles/Role";
import {getEnv} from "../../utils/JwtSecret";
import {Context, context} from "../../context";
import {createClient} from "redis";



export const issueJWTTokenForSession = async  (userId: string, role: Role = Role.USER, accessToken?:string): Promise<string> => {
    const sessionId = uuid()
    const sesstionData = {
        userId, sessionId, role, access_token: accessToken, last_access: new Date().getDate()}
      const session = jwt.sign(sesstionData, getEnv("AUTH_SECRET"))
try{
    const redisClient = await createClient().connect()
    await redisClient.set(`USER:${sessionId}:${userId}`, JSON.stringify(sesstionData), {
        EX: 30 * 24 * 60 * 60
    })
    await redisClient.quit()

}catch (e){
        console.log(e)
    }
    return session

}


