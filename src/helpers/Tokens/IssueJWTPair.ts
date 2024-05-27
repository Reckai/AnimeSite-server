
import jwt from "jsonwebtoken";
import{ v4 as uuid} from "uuid";



import {Role} from "../../Roles/Role";
import {getEnv} from "../../utils/JwtSecret";
import {Context, context} from "../../context";



export const issueJWTTokenForSession = async  (userId: string, role: Role = Role.USER): Promise<string> => {
      const session = jwt.sign({userId},  getEnv("AUTH_SECRET"), {
          expiresIn: '30d'
      })
     const existingSession = await context.prisma.session.findFirst({
        where:{
            userId
        }
     });
     if(existingSession){
         await context.prisma.session.update({
             where:{
                 id: existingSession.id
             },
             data:{
                 token: existingSession.token
             }
         })}else{
             await context.prisma.session.create({
            data:{
                token: session,
                userId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
            }
      })
         }

    return session
}


