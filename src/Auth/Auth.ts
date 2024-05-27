import { Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { RefreshToken } from "../Tokens/Session";
import { Context } from "../context";
import { issueJWTPair } from "../helpers/Tokens/IssueJWTPair";
import { GraphQLError } from "graphql";
import {Void} from "graphql-scalars/typings/typeDefs";

// Define a new object type to represent the return type of the refreshTokens mutation
@ObjectType()
class RefreshTokenResponse {
  @Field(type => String)
  token: string;

  @Field(type => String)
  refreshToken: string;
}

@Resolver()
export class RefreshTokenResolver {
  @Mutation(returns =>Boolean) // Specify the return type using the RefreshTokenResponse class
  async Tokens(@Ctx() ctx: Context): Promise<Boolean> {
    console.log('@', ctx.token);


    if (ctx.token) {
      const existingToken = await ctx.prisma.session.findUnique({
        where: { token: ctx.token },
      });
      if (!existingToken) {
        console.log('@@ Token does not exist');
        throw new GraphQLError("Token does not exist");
      }
      if (existingToken.expiresAt < new Date()) {
        console.log('@@, Token expired');
        throw new GraphQLError("Token expired");
      }
      const { token, refreshToken: newRefreshToken } = await issueJWTPair(
        existingToken.userId
      );

      console.log('asdasdad', token, newRefreshToken);
      ctx.res.cookie('access-token', token, { httpOnly: true, maxAge: 1000 * 60 * 15, path: 'http://localhost:3000/'});
      ctx.res.cookie('refresh-token', newRefreshToken,{ httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30, path: process.env.REQ_URL});
      ctx.res.cookie('ads','asdasdad',{httpOnly:true, maxAge:1000*60*60*24*30, path:process.env.REQ_URL})
      return true;
    }
    console.log('@@');

    throw new GraphQLError("No token provided",{extensions:{code:'403'}});
  }
}
