import 'reflect-metadata'
import {Field, ID, ObjectType} from "type-graphql";
import {AnimeList} from "../AnimeList/AnimeList";
import {Reply} from "../Reply/Reply";
import {Comment} from "../Comment/Comment";

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(()=> String, { nullable: true })
    name?: string | null;

    @Field(() => [Comment], { nullable: true })
    comments?: Comment[];

    @Field(() => [Reply], { nullable: true })
    replies?: Reply[];

    @Field(() => [AnimeList], { nullable: true })
    animeList?: AnimeList[];

    @Field()
    createdAt: Date;
}
