import { Arg, Ctx, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../../context";
import { AnimeFilterInput, FilterableAnimeFields, PaginatedAnimeResult, RelationFilter } from "../types/SearchAnimeResult";
import { Genre } from "../types/Genre";
import { Studio } from "../types/Studio";
import { AnimeFilterParams, FilterConfig, FilterParams } from "../types/FetchReleasesTypes";
import { Prisma } from "@prisma/client";

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


@Resolver()
export class FilterAnimeResolver {
    
    @Query(()=>ReleasesFilters)
    async fetchReleasesFilters(@Ctx() ctx: Context):Promise<ReleasesFilters>{
        const [genres, studios] = await Promise.all([
            ctx.prisma.genre.findMany({
                select: {id: true, russian: true}
            }),
            ctx.prisma.studio.findMany({
                select: {id: true, name: true}
            })
        ])
        const genreCounts = await ctx.prisma.anime.count()
        const studioCounts = await ctx.prisma.anime.count()
        return {
            genres: genres.map((genre) => ({
                count: genreCounts,
                genres: [genre as Pick<Genre, "id" | "russian">]
            })),
            studios: studios.map((studio) => ({
                count: studioCounts,
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
    ): Promise<{animes: Array<Prisma.AnimeGetPayload<{}>>, count: number}> {
        const { take, cursor, orderBy, filters } = params;
        
        const conditions: Prisma.AnimeWhereInput[] = [];

        if (filters) {
            Object.entries(filters).forEach(([filterType, filterParams]) => {
                conditions.push(...this.buildFilterConditions(filterType, filterParams));
            });
        }

        const whereCondition = {
            AND: conditions.length ? conditions : undefined
        };

        const [animes, count] = await Promise.all([
            ctx.prisma.anime.findMany({
                take: take ?? 10,
                skip: cursor ? 1 : 0,
                cursor: cursor ? { id: cursor } : undefined,
                where: whereCondition,
                orderBy,
                include: Object.values(this.filterConfigs).reduce((acc, config) => ({
                    ...acc,
                    [config.relation]: true
                }), {})
            }),
            ctx.prisma.anime.count({
                where: whereCondition
            })
        ]);
         
        return { animes, count };
    }
  
  

}  
