import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { VerificationToken } from "./VerificationToken";
import { Context } from "../context";
import { getVerificationTokenByToken } from "./Service/VerificationTokenService";
import { GraphQLError } from "graphql";


@ObjectType()
class VerifyEmailResponse {
   @Field((type) => String)
    message: String
   @Field((type) => Boolean)
    success: Boolean
}

@Resolver(VerificationToken)
export class VerificationTokenResolver {
  @Mutation((returns) => VerifyEmailResponse)   
  async VerifyEmailByToken(@Arg('token') token: string,@Ctx() context: Context): Promise<VerifyEmailResponse> {
    console.log('verificationtoken')
  const existingToken = await getVerificationTokenByToken(token)
  if(!existingToken){
    throw new GraphQLError('Invalid token',{extensions:{code:'SOMETHING_WENT_WRONG'}})

  }
   await context.prisma.user.update({
    where:{
        email:existingToken.email
    },
    data: {
        emailVerified: new Date(new Date().getTime())
    }
  }) 
  await  context.prisma.verificationToken.delete({
    where:{
        id:existingToken.id
    }
  })
  return {
    message: 'Email verified successfully',
    success: true
  }
}}