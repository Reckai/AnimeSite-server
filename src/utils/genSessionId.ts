import { Role } from "@prisma/client"
import { Session, SessionData } from "express-session"
import { User } from "../User/User"

export const generateSessionKey= (req: Express.Request & {session: Session & Partial<SessionData> & {userId?:string, roles?:Role[]}})=>{
    const userId = req.session?.user?.id ? req.session.user.id : '';
    const randomId = Math.random().toString(36).substring(2);
  return `session:${userId}:${randomId}`;
}