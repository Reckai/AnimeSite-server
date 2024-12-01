import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { VerificationToken } from "../types/VerificationToken";
import { getVerificationTokenByToken } from "../../VerificationToken/Service/VerificationTokenService";
import { Context } from "../../context";


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
  async VerifyEmailByToken(@Arg('token',()=>String) token: string,@Ctx() context: Context): Promise<VerifyEmailResponse> {
 try{
 
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
 }
 catch(e){
     console.log(e)
  if (e instanceof GraphQLError) {
    throw e;
  }
  throw new GraphQLError('Something went wrong',{extensions:{code:'SOMETHING_WENT_WRONG'}})
 }
}}
