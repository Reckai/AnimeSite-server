import { PrismaClient, Role } from '@prisma/client'
import {BaseContext} from "@apollo/server";

import { SessionData, Session } from 'express-session';
import express from "express";

const prisma = new PrismaClient()

export interface Context extends BaseContext{
  prisma: PrismaClient,
  res?:any,
  token?:string,
  userId?:string,
  req: express.Request & { session: Session & Partial<SessionData> & { userId?: string, roles?: Role[]  } }
  }
export const context: Context = {
  prisma: prisma,
  req: {}  as  express.Request & { session: Session & Partial<SessionData> & { userId?: string, roles?: Role[]  } }
  ,
}
