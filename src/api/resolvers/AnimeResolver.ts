import 'reflect-metadata'

import {Arg, Ctx, Field, FieldResolver, ObjectType, Query, Resolver, Root,} from 'type-graphql'
import { AnimeStatus } from '../types/AnimeList';
import { Anime } from '../types/Anime';
import { CacheControl } from '../../cache-control';
import { Context } from '../../context';




@ObjectType()
class AnimeListStatusDistribution {
    @Field(type => AnimeStatus) status: AnimeStatus;

    @Field(type => Number) count: number;
}

ObjectType()
export class AnimeResponse extends Anime {
    @Field(type => [AnimeListStatusDistribution])
    userWatchListStatusDistributions: AnimeListStatusDistribution[];
}


@ObjectType()
class AllAnimeResponse {
    @Field(type => [Anime])
    items: Anime[];

    @Field(type => Number)
    totalCount: number;

    @Field(type => Boolean)
    hasNextPage: boolean;
}
@Resolver(Anime)
export class AnimeResolver {

    @FieldResolver(returns => [AnimeListStatusDistribution])
    @CacheControl({ maxAge: 60 })
    async userWatchListStatusDistributions(@Root() id: Anime, @Ctx() ctx: Context) {

        const animeLists = await ctx.prisma.animeList.groupBy({
            by: ['status'], where: {
                anime: {
                    id: id.id as string

                }
            }, _count: {
                _all: true,
            },
        });

        return animeLists.map((group) => ({
            count: group._count._all, status: group.status,
        }));
    }

    @Query(() => AllAnimeResponse)
    @CacheControl({ maxAge: 60 })
    async allAnimes(@Arg('page') page:number, @Ctx() ctx: Context, ) {

        const LIMIT: number = 20;
        if(page === 0  ){
            return{
                items: [],
                totalCount: 0,
                hasNextPage: false
            }
        }


        const Skip = (page - 1) * LIMIT;

console.log('page',page)
const [items, totalCount] =await Promise.all([
                   ctx.prisma.anime.findMany({
                       include: {
                           genres: true, studios: true, poster: true,  animeLists: true, _count: {select: {animeLists: true}}
                       }, skip:Skip, take: LIMIT
                   }),
                   ctx.prisma.anime.count()
               ]);
        const hasNextPage = Skip + LIMIT < totalCount;
        return {
            items,
            totalCount,
            hasNextPage,
        }
    }


    @Query(() =>Anime )
    @CacheControl({ maxAge: 60 })
    async anime(@Arg('slug') slug: string, @Ctx() ctx: Context) {
        const userId= ctx.req.session.userId
  try{
        const anime = await ctx.prisma.anime.findUnique({
            where: {
                slug: slug
            }, include: {

                genres: true, studios: true, poster: true, comments: true,  animeLists: userId ? {
                    where: {
                      AND: [
                        { anime:  { slug }  },
                        { user: {  id: userId } }
                      ]
                    }
                  } : undefined
            }
        })
       console.log(anime)

        return anime;
       }catch (e){
           console.log(e)}



    }


}
