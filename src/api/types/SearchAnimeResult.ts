import { Field, InputType, Int, ObjectType, registerEnumType } from "type-graphql";
import { Anime } from "./Anime";
import { SortDirection, SortOrder } from "./SortOrder";

@InputType()
export class FilterOptions {
  @Field(() => [String], { nullable: true })
  include?: string[];

  @Field(() => [String], { nullable: true })
  exclude?: string[];
}


@InputType()
export class  RelationFilter{
    @Field(() => FilterableAnimeFields, { nullable: true })
    field?: FilterableAnimeFields;

    @Field(() => FilterOptions)
    operators: FilterOptions;
}

@InputType()
export class AnimeFilterInput{
    @Field(() => SortDirection, { nullable: true })
    searchText?: SortDirection;

    @Field(() => [RelationFilter], { nullable: true })
    relationFilters?: RelationFilter[];

    @Field(()=>String, {nullable: true, description: "The field to sort by", defaultValue:'ask'})
    orderBy?: string;
    @Field(() => Int, { defaultValue: 1 })
    page: number;

    @Field(() => Int, { defaultValue: 20 })
    pageSize: number;
}

@ObjectType()
export class PaginatedAnimeResult {
    @Field(() => [Anime], { nullable: true })
    animes?: Anime[];
    @Field(() => Int )
    count: number;
}

export enum FilterableAnimeFields {
    genres = "genres",
    studios = "studios",
}


registerEnumType(FilterableAnimeFields,{
    name: "FilterableAnimeFields",
    description: "The fields that can be filtered for anime",
})