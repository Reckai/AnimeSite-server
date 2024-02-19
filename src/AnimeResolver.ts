import 'reflect-metadata'

import {Arg, Ctx, Field, FieldResolver, ObjectType, Query, Resolver, Root,} from 'type-graphql'

import {Context} from './context'

import {Anime} from "./Anime";

import {AnimeStatus} from "./AnimeList/AnimeList";


@ObjectType()
class AnimeListStatusDistribution {
    @Field(type => AnimeStatus)
    status: AnimeStatus;

    @Field(type => Number)
    count: number;
}
@Resolver(Anime)
export class AnimeResolver {

    @FieldResolver(returns => [AnimeListStatusDistribution])
    async userWatchListStatusDistributions (@Root() anime: Anime, @Ctx() ctx: Context) {

        const animeLists = await ctx.prisma.animeList.groupBy({
            by: ['status'],
            where: {
                anime: {
                    some: {
                        id: anime.id as string,
                    },
                }
            },
            _count: {
                _all: true,
            },
        });

        return animeLists.map((group) => ({
            count: group._count._all, status: group.status,
        }));
    }

    @Query(() => [Anime])
    async allAnimes(@Ctx() ctx: Context) {
        console.log(1)
        return ctx.prisma.anime.findMany({
            include: {
                genres: true,
                studios: true,
                poster: true,
                animeLists: true,
                _count: {select: {animeLists: true}}
            }
        })

    }

    @Query(() => Anime)
    async anime(@Arg('slug') slug: string, @Ctx() ctx: Context) {


        return ctx.prisma.anime.findUnique({
            where: {
                slug: slug
            }, include: {genres: true, studios: true, poster: true, animeLists: true}
        })
    }


}
