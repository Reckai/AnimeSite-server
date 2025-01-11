import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'
import { CacheControl } from '../../cache-control'
import { Genre } from './Genre'
import { Studio } from './Studio'
import { Poster } from './Poster'
import { AnimeList } from './AnimeList'
import { AnimeListStatusDistribution } from './AnimeListStatusDistribution'
import { Comment } from './Comment'
@ObjectType({})
@CacheControl({ maxAge: 60 })
export class Anime {
    @Field(() => ID)
    id: string;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    licenseNameRu?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => [Genre], { nullable: true })
    genres?: Genre[];

    @Field(() => String)
    slug: string;

    @Field(() => [Studio], { nullable: true })
    studios?: Studio[];

    @Field(() => [Poster], { nullable: true })
    poster?: Poster[];

    @Field(() => [AnimeList], { nullable: true })
    animeLists?: AnimeList[];

    @Field(() => [Comment], { nullable: true })
    comments?: Comment[];

}
