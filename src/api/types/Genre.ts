import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Genre{
@Field((type) => ID)
    id:      String
    @Field((type) => String)
    name:    String
    @Field((type) => String)
    russian: String
    
}
