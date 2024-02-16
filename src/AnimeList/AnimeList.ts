import 'reflect-metadata'
import {ObjectType, Field, ID, registerEnumType} from 'type-graphql'
import {User} from "../User/User";
import {Anime} from "../Anime";


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
