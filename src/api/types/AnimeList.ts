import 'reflect-metadata'
import {ObjectType, Field, ID, registerEnumType} from 'type-graphql'
import {User} from "./User";
import {Anime} from "./Anime";
import { CacheControl } from '../../cache-control';

export enum AnimeStatus {
    WATCHING = 'WATCHING',
    COMPLETED = 'COMPLETED',
    DELAYED = 'DELAYED',
    DROPPED = 'DROPPED',
    PLANNED = 'PLANNED',

}

registerEnumType(AnimeStatus, {
    name: 'AnimeStatus',
    description: 'Статусы аниме в списке пользователя',
});

@ObjectType()
@CacheControl({ maxAge: 60 })
export class AnimeList{
    @Field((type) => ID)
    id:        String;
    @Field(() => AnimeStatus)
    status: AnimeStatus;
    @Field(() => User)
    user: User;
    @Field(() => Anime)
    anime: Anime;

}
