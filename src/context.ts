import { PrismaClient } from '@prisma/client'
import {Role} from "./Roles/Role";
import {BaseContext} from "@apollo/server";

const prisma = new PrismaClient()

export interface Context extends BaseContext{
  prisma: PrismaClient,
  res?:any,
  token?:string,
  userId?:string,
  req?:any,
  }

export const context: Context = {
  prisma: prisma,
}
