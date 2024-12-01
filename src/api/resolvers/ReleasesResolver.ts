import 'reflect-metadata'
import { Args, ArgsType, Ctx, Field, InputType, Int, ObjectType, Query, registerEnumType, Resolver } from "type-graphql";
import { Anime } from "../types/Anime";
import { Context } from '../../context';

enum OrderDirection {
    ASC = "ASC",
    DESK = "DESK"
}

registerEnumType (OrderDirection    ,{
    name: 'OrderDirection'
})


@InputType()
class ReleaseOrderInput{
    @Field(() => String)
    field: string

    @Field(() => OrderDirection)
    direction: OrderDirection
}

@InputType()
class FilterInput {
    @Field(() => [String], { nullable: true })
    include?: string[];

    @Field(() => [String], { nullable: true })
    exclude?: string[];
}

@ArgsType()
class FetchReleasesArgs{
    @Field(() => Int, { nullable: true })
    first?: number
    @Field(() => String, { nullable: true })
    after?: string
    @Field(() => ReleaseOrderInput, { nullable: true })
    orderBy?: ReleaseOrderInput;
    @Field(() => String, { nullable: true })
    query?: string

    @Field(() => FilterInput, { nullable: true })
    type?: FilterInput

    @Field(() => FilterInput, { nullable: true })
    status?: FilterInput

    @Field(() => FilterInput, { nullable: true })
    activity?: FilterInput

    @Field(() => FilterInput, { nullable: true })
    genre?: FilterInput

    @Field(() => FilterInput, { nullable: true })
    studio?: FilterInput

}


@ObjectType()
class PageInfo{
    @Field(()=> Boolean)
    hasNextPage: boolean
    
}

@ObjectType()
class ReleaseEdge{
    @Field(()=> Anime)
    node:Anime
}

@ObjectType()
class ReleaseResponse {
@Field(()=> Int)
totalCount: number;
@Field(()=>[ReleaseEdge])
edges: ReleaseEdge[]

@Field(()=>PageInfo)
pageInfo: PageInfo
}




// @Resolver(Anime)
// export class ReleasesResolver{
//      @Query(()=> ReleaseResponse)
//      async fetchReleases(@Args(){
//         first,
//         after,
//         orderBy,
//         query,
//         type,
//         genre,
//         studio
//      }:FetchReleasesArgs, @Ctx() ctx: Context):Promise<ReleaseResponse>{
//         const releases = ctx.prisma.anime.findMany({
            
//         }) 
//      }
// }