import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Poster {
    @Field((type) => ID)
    id: String;
    @Field((type) => String)
    originalUrl: String;
    @Field((type) => String)
    previewUrl: String;
}
