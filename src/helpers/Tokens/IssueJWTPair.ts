
import jwt from "jsonwebtoken";
import{ v4 as uuid} from "uuid";



import {getEnv} from "../../utils/JwtSecret";
import { Role } from "../../api/types/Role";



export const issueJWTTokenForSession = async  (userId: string, role: Role = Role.USER, accessToken?:string): Promise<string> => {
    const sessionId = uuid()
    const sesstionData = {
        userId, sessionId, role, access_token: accessToken, last_access: new Date().getDate()}
      const session = jwt.sign(sesstionData, getEnv("AUTH_SECRET"))
try{
    
}catch (e){
        console.log(e)
    }
    return session

}


