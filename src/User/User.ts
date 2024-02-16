import {Field, ID, ObjectType} from "type-graphql";
import {AnimeList} from "../AnimeList/AnimeList";
import {Reply} from "../Reply/Reply";

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    name?: string;

    @Field(() => [Comment], { nullable: true })
    comments?: Comment[];

    @Field(() => [Reply], { nullable: true })
    replies?: Reply[];

    @Field(() => [AnimeList], { nullable: true })
    animeList?: AnimeList[];

    @Field()
    createdAt: Date;
}
