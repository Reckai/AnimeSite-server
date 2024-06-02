import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class VerificationToken{
    @Field((type) => ID)
    id: String
    @Field((type) => String)
    email: String
    @Field((type) => String)
    token: String
    @Field((type) => Date)
    expirationDate: Date
}
