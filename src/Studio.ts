import {Anime} from "./Anime";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Studio{
    @Field((type) => ID)
    id: String
    @Field((type) => String)
    name: String
}
