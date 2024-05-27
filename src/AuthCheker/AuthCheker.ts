import {AuthChecker, AuthenticationError} from "type-graphql";
import {context, Context} from "../context";
import jwt from "jsonwebtoken";
import {Roles} from "../Roles/Roles";
import { Role } from "../Roles/Role";



export const authChecker: AuthChecker<Context> =  async (

    { context: { prisma, token } }) => {
    // Здесь мы можем прочитать пользователя из контекста
    // и проверить его разрешения в базе данных против аргумента `roles`

    if(!token){
        return false

    }

    const verify= jwt.verify(token, process.env.AUTH_SECRET || '', (err, decoded) => {
        if(err){
            return false
        }
        return decoded
    })
    console.log(verify)
    if(!verify){
        return false
    }
    
   const existingUser = await  prisma.user.findUnique({
        where:{
            id: verify.userId as string
        }
    })
    if(!existingUser){
        throw new AuthenticationError('Not authenticated');
    }
    return Roles.includes(existingUser.role as Role)

    }
