import 'reflect-metadata'
import {Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver} from "type-graphql";
import {User} from "./User"
import {Context} from "../context";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {getEnv} from "../utils/JwtSecret";
import {GraphQLError} from "graphql";
import {Role} from "../Roles/Role";
import {issueJwtPair} from "../helpers/Tokens/IssueJWTPair";
import {deleteRefreshToken} from "../Services/RefreshToken/RefreshTokenService";


@InputType()
class UserLoginInput {
    @Field() email: string;
    @Field() password: string;
}
@InputType()
class UserSignUpInput extends UserLoginInput {
    @Field({nullable: true}) name?: string;
}


@ObjectType()
class AuthPayload {
    @Field() token: string;
    @Field() RefreshToken: string;
    @Field() user: User;
}

@Resolver(User)
export class UserResolver {
    @Mutation((returns) => AuthPayload)
    async signupUser(@Arg('args') args: UserSignUpInput, @Ctx() ctx: Context,): Promise<AuthPayload> {
        const password = await bcrypt.hash(args.password, 10)
        const user  = await ctx.prisma.user.create({
            data: {...args, password},
        })
        const {token, RefreshToken} = await issueJwtPair(user.id)
        return {
            user,
            token,
            RefreshToken
        }
    }

    @Mutation((returns) => AuthPayload)
    async loginUser(@Arg('args') args: UserLoginInput, @Ctx() ctx: Context,): Promise<AuthPayload> {
        const user = await ctx.prisma.user.findUnique({
            where: {
                email: args.email
            }
        })
        if (!user) {
            throw new GraphQLError('No such user found')
        }
        const valid = await bcrypt.compare(args.password, user.password)
        if (!valid) {
            throw new GraphQLError('Invalid password or email')
        }
        await
        await deleteRefreshToken()
       const {token, RefreshToken} = await issueJwtPair(user.id)
         return {
            user,
            token,
            RefreshToken
        }
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

