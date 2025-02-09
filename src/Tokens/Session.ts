import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'


@ObjectType()
export class Session {
  @Field(() => ID)
  id: string

  @Field(() => String)
  token: string

  @Field(()=>Date)
  expiresAt: Date

  @Field(()=>String)
  userId: string


}
