import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'
import {Genre} from "./Genre";
import {Poster} from "./Poster";
import {Studio} from "./Studio";
import {AnimeList} from "./AnimeList/AnimeList";

@ObjectType()
export class Anime{
    @Field((type) => ID)
    id: String

    @Field((type) => String)
    name:String
    @Field((type) => String)
    licenseNameRu: String
    @Field((type) => String)
    description?:   String
    @Field((type) => [Genre], { nullable: true })
    genres:        [Genre]
    @Field((type) => String)
    slug:          String
    @Field((type) => [Studio], { nullable: true })
    studios:       [Studio]
    @Field((type) => [Poster])
    poster: Poster

    @Field((type) => [AnimeList], { nullable: true })
    animeLists?: AnimeList[]
}
