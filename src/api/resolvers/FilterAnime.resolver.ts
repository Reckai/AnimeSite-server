import { Arg, Ctx, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../../context";
import { Genre } from "../types/Genre";
import { Studio } from "../types/Studio";
import { AnimeFilterParams, FilterConfig, FilterParams } from "../types/FetchReleasesTypes";
import { Prisma } from "@prisma/client";
import { Anime } from "../types/Anime";

@ObjectType()
class GenreFilterResult {
    @Field(() => Int)
    count: number;

    @Field(() => [GenreFilterFields], { nullable: 'items' })
    genres: Array<Pick<Genre, "id" | "russian">>;
}

@ObjectType()
class GenreFilterFields {
    @Field(() => String)
    id: String;

    @Field(() => String)
    russian: string;
}

@ObjectType()
class StudioFilterResult {
    @Field(() => Number)
    count: Number;

    @Field(() => [StudioFilterFields], { nullable: 'items' })
    studios: Array<Pick<Studio, "id" | "name">>;
}

@ObjectType()
class StudioFilterFields {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;
}

@ObjectType()
export class ReleasesFilters {
    @Field(() => [GenreFilterResult])
    genres: GenreFilterResult[];

    @Field(() => [StudioFilterResult])
    studios: StudioFilterResult[];
}

@ObjectType()
export class PaginatedAnimeResult {
    @Field(() => [Anime], { nullable: true })
    animes?: Anime[];
    
    @Field(() => Int)
    count: number;

    @Field(() => Boolean)
    hasNextPage: boolean;
}

@Resolver()
export class FilterAnimeResolver {
    
    @Query(()=>ReleasesFilters)
    async fetchReleasesFilters(@Ctx() ctx: Context):Promise<ReleasesFilters>{
        const [genres, foundedStudios] = await Promise.all([
            ctx.prisma.genre.findMany({
                select: {id: true, russian: true}
            }),
            ctx.prisma.studio.findMany({
                select: {id: true, name: true}
            })
        ])

        // Get count for each genre
        const genreCounts = await Promise.all(
            genres.map(genre => 
                ctx.prisma.anime.count({
                    where: {
                        genres: {
                            some: {
                                id: genre.id
                            }
                        }
                    }
                })
            )
        )
        
        const studioCounts = await Promise.all(
            foundedStudios.map(studio => 
                ctx.prisma.anime.count({
                    where: {
                        studios: {
                            some: {
                                id: studio.id
                            }
                        }
                    }
                })
            )
        )
        return {
            genres: genres.map((genre, index) => ({
                count: genreCounts[index],
                genres: [genre as Pick<Genre, "id" | "russian">]
            })),
            studios: foundedStudios.map((studio,index) => ({
                count: studioCounts[index],
                studios: [studio as Pick<Studio, "id" | "name">]
            }))
        }
    }
    private filterConfigs: Record<string, FilterConfig> = {
        genres: {
            relation: 'genres'
        },
        studios: {
            relation: 'studios'
        }
    }
    
  private buildFilterConditions(filterType: string, params: FilterParams): Prisma.AnimeWhereInput[] {
    const conditions: Prisma.AnimeWhereInput[] = [];
    const config = this.filterConfigs[filterType];

    if (!config) return conditions;

    if (params.include?.length) {
      conditions.push({
        [config.relation]: {
          some: {
            id: {
              in: params.include
            }
          }
        }
      });
    }

    if (params.exclude?.length) {
      conditions.push({
        NOT: {
          [config.relation]: {
            some: {
              id: {
                in: params.exclude
              }
            }
          }
        }
      });
    }

    return conditions;
  }

    @Query(() => PaginatedAnimeResult)
    async animesWithFilter(
        @Arg("filter", () => AnimeFilterParams) params: AnimeFilterParams, 
        @Ctx() ctx: Context
    ): Promise<{animes: Array<Prisma.AnimeGetPayload<{}>>, count: number, hasNextPage: boolean}> {
        let { take, cursor, orderBy, filters, ruName } = params;
        if(!take){take = 20}
        const conditions: Prisma.AnimeWhereInput[] = [];
        
        console.log('Received filters:', filters);
        console.log("name", ruName)
        if (filters) {
            Object.entries(filters).forEach(([filterType, filterParams]) => {
              
                const newConditions = this.buildFilterConditions(filterType, filterParams);
              
                conditions.push(...newConditions);
            });
        }
        
        console.log('Final conditions:', conditions);
        
        const whereCondition: Prisma.AnimeWhereInput = {
            licenseNameRu: {
                contains: ruName,
                mode:'insensitive'
            },
            AND: conditions.length ? conditions : undefined
        };

        const [animes, count] = await Promise.all([
            ctx.prisma.anime.findMany({
                take: take + 1,
                skip: cursor ? 1 : 0,
                cursor: cursor ? { id: cursor } : undefined,
                where: whereCondition,
                
                orderBy,
                include: {
                    poster: true,
                    genres: true,
                    studios: true
                }
            }),
            ctx.prisma.anime.count({
                where: whereCondition
            })
        ]);

        const hasNextPage = animes.length > take;
        const paginatedAnimes = hasNextPage ? animes.slice(0, -1) : animes;
        
        return { animes: paginatedAnimes, count, hasNextPage };
    }
  
  

}  
