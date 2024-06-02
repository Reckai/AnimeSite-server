

import 'reflect-metadata'
import {Arg, Authorized, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {User} from "./User"
import {Context} from "../context";

import bcrypt from 'bcryptjs';

import {GraphQLError} from "graphql";
import {issueJWTTokenForSession} from "../helpers/Tokens/IssueJWTPair";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN, EXPIRES_IN_30D, HTTP_ONLY} from "../constants";
import { generateVerificationToken } from '../VerificationToken/Service/VerificationTokenService';
import { sendVerificationEmail } from '../Resend/ResendService';
import { VerificationToken } from '@prisma/client';


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
    @Mutation((returns) => String)
    async signupUser(@Arg('email') email: string, @Arg('password') password: string,  @Ctx() ctx: Context,): Promise<String> {
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

        const verificationToken = await generateVerificationToken(user.email) as VerificationToken
        await sendVerificationEmail( verificationToken.email, verificationToken.token)
     
     
        return 'Check your email for verification link'
        // ctx.res.cookie(ACCESS_TOKEN, session, { httpOnly: HTTP_ONLY, maxAge: EXPIRES_IN_30D  })
        // return {
        //     user: existingUser as User,
        // }
    }



    @Mutation((returns) => AuthPayload || String) 
    async loginUser(@Arg('args') args: UserLoginInput, @Ctx() ctx: Context,): Promise<AuthPayload | String>  {
try {
    
    
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
    if(!user.emailVerified){
        const verificationToken = await generateVerificationToken(user.email) as VerificationToken
        await sendVerificationEmail(verificationToken.email, verificationToken.token ) 
        throw new GraphQLError('Email not verified, check your email for verification link')
    }
   const session = await issueJWTTokenForSession(user.id)
    ctx.res.cookie(ACCESS_TOKEN, session, { httpOnly: HTTP_ONLY, maxAge: EXPIRES_IN_30D})
    return {
        user: user as User,
    }
} catch (error) {
 if(error instanceof GraphQLError){
     throw error
 }
 throw new GraphQLError('Somethssssing went wrong')
}
    }
    @Authorized(['ADMIN', 'USER'])
    @Query((returns) => User)
    async me(@Ctx() ctx: Context) {
       const userId = jwt.decode(ctx.token as string)
        return  ctx.prisma.user.findUnique({
            where: {
                id: ctx.userId
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

