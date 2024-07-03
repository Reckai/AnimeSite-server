import {Arg, Ctx, Field, Mutation, ObjectType, Resolver} from "type-graphql";
import { Context } from "../context";

import { GraphQLError } from "graphql";
import {Void} from "graphql-scalars/typings/typeDefs";
import {verifyGoogleToken} from "../utils/verifyGoogleToken";
import {ACCESS_TOKEN} from "../constants";
import {issueJWTTokenForSession} from "../helpers/Tokens/IssueJWTPair";
import {User} from "../User/User";
import {exclude} from "../utils/exclude";
import axios from "axios";

// Define a new object type to represent the return type of the refreshTokens mutation
@ObjectType()
class RefreshTokenResponse {
  @Field(type => String)
  token: string;

  @Field(type => String)
  refreshToken: string;
}

async function getGoogleUserInfo(access_token:string) {
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Google user info:', error);
    return null;
  }
}
@Resolver()
export class AuthResolver {


  @Mutation(returns => User)
  async  loginWiaGoogle(@Ctx() ctx: Context, @Arg('token') token:string) : Promise<User| undefined> {


   try{
     const googleUser = await getGoogleUserInfo(token);
     if(!googleUser){
       throw  new GraphQLError('Invalid token')
     }
     let existingAccount = await ctx.prisma.account.findUnique({

        where:{
          provider_providerAccountId:{
            provider: 'google',
            providerAccountId: googleUser.sub
          }
        },
        include:{
          user:true
        }
      })

     let user;

      if(existingAccount){
        user = existingAccount.user;
      }else{
        user = await ctx.prisma.user.findUnique({ where: { email: googleUser.email } });

        if (user) {
          // Если пользователь с таким email существует, привязываем Google аккаунт

          // Обновляем информацию пользователя, если необходимо
          user = await ctx.prisma.user.update({
            where: { id: user.id },
            data: {
              name: user.name || googleUser.name,
              image: user.image || googleUser.picture,
              emailVerified: user.emailVerified || new Date(),
            },
          });
        } else {
          // Если пользователя нет, создаем нового
          user = await ctx.prisma.user.create({
            data: {
              email: googleUser.email,
              name: googleUser.name,
              image: googleUser.picture,
              emailVerified: new Date(),
            },
          });
        }
          const NewAccount = await ctx.prisma.account.create({
          data: {
            userId: user.id,
            type: 'oauth',
            provider: 'google',
            providerAccountId: googleUser.sub,
            access_token:token,
            expires_at: Math.floor(Date.now() / 1000 + 3600), // токен действителен 1 час
            token_type: 'Bearer',
            scope: 'email profile',
          },
        });
      }
        const session = await issueJWTTokenForSession(user.id);
        ctx.res.cookie(ACCESS_TOKEN, session, { httpOnly: true, maxAge: 1000 * 60 * 15,});
        return exclude(user, ['password']) as User;
   }catch(e){
      if(e instanceof GraphQLError){
        throw e
      }
   }
  }

}
