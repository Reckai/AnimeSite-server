

import 'reflect-metadata'
import {Arg, Authorized, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {User} from "./User"
import {Context} from "../context";

import bcrypt from 'bcryptjs';

import {GraphQLError} from "graphql";
import {issueJWTTokenForSession} from "../helpers/Tokens/IssueJWTPair";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN, EXPIRES_IN_30D, HTTP_ONLY} from "../constants";


@InputType()
class UserLoginInput {
    @Field() email: string;
    @Field() password: string;
}



@ObjectType()
class AuthPayload {
    @Field() user: User;
}

@Resolver(User)
export class UserResolver {
    @Mutation((returns) => AuthPayload)
    async signupUser(@Arg('email') email: string, @Arg('password') password: string,  @Ctx() ctx: Context,): Promise<AuthPayload> {
       const userExists = await ctx.prisma.user.findUnique({
           where: {
               email: email
           }
       })
       if (userExists) {
                throw new GraphQLError('User already exists')
            }
        const hashedPassword = await bcrypt.hash(password, 10)
        const nameFromEmail = email.split('@')[0]
        const user  = await ctx.prisma.user.create({
            data: {email, password: hashedPassword, name: nameFromEmail, createdAt: new Date()},
        })
        const session = await issueJWTTokenForSession(user.id)
         const existingUser = await ctx.prisma.user.findUnique({
            where: {
                email: email
            }
        })
        ctx.res.cookie(ACCESS_TOKEN, session, { httpOnly: HTTP_ONLY, maxAge: EXPIRES_IN_30D  })
        return {
            user: existingUser as User,
        }
    }



    @Mutation((returns) => AuthPayload)
    async loginUser(@Arg('args') args: UserLoginInput, @Ctx() ctx: Context,): Promise<AuthPayload> {

        const user = await ctx.prisma.user.findUnique({
            where: {
                email: args.email

            },
            include:{
                refreshToken: true
            }
        })
        if (!user) {
            throw new GraphQLError('No such user found')
        }
        const valid = await bcrypt.compare(args.password, user.password??"")
        if (!valid) {
            throw new GraphQLError('Invalid password or email')
        }
       const session = await issueJWTTokenForSession(user.id)
        ctx.res.cookie(ACCESS_TOKEN, session, { httpOnly: HTTP_ONLY, maxAge: EXPIRES_IN_30D})
        return {
            user: user as User,
        }
    }
    @Authorized(['ADMIN', 'USER'])
    @Query((returns) => User)
    async me(@Ctx() ctx: Context) {
       const userId = jwt.decode(ctx.token as string)
        return  ctx.prisma.user.findUnique({
            where: {
                id: '18133f3f-015e-4c96-a1e8-66a7e65c9948'
            },
            select:{
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                image: true
            }

        })

    }

    @Mutation((returns) => Boolean)
    async  deleteAllUsers(@Ctx() ctx: Context,) {
       try{
           await ctx.prisma.animeList.deleteMany({
               where: {
                   user: {
                       every: {
                           id: {
                               not: undefined
                           }
                       }
                   },
               },
           });
           await ctx.prisma.user.deleteMany()
           return true
       }catch (e){
           console.log(e)
           return false
       }

    }



}



// export class UserResolver {
//  @FieldResolver()
//  async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[] | null> {
//   return ctx.prisma.user
//       .findUnique({
//        where: {
//         id: user.id,
//        },
//       })
//       .posts()
//  }
//
//
//  @Query(() => [User])
//  async allUsers(@Ctx() ctx: Context) {
//   return ctx.prisma.user.findMany()
//  }
//
//  @Query((returns) => [Post], { nullable: true })
//  async draftsByUser(
//      @Arg('userUniqueInput') userUniqueInput: UserUniqueInput,
//      @Ctx() ctx: Context,
//  ) {
//   return ctx.prisma.user
//       .findUnique({
//        where: {
//         id: userUniqueInput.id || undefined,
//         email: userUniqueInput.email || undefined,
//        },
//       })
//       .posts({
//        where: {
//         published: false,
//        },
//       })
//  }

// }

