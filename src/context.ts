import { PrismaClient, Role } from '@prisma/client'
import {BaseContext} from "@apollo/server";

import { SessionData, Session } from 'express-session';

const prisma = new PrismaClient()

export interface Context extends BaseContext{
  prisma: PrismaClient,
  res?:any,
  token?:string,
  userId?:string,
  req?:unknown
  }
export const context: Context = {
  prisma: prisma,
}
