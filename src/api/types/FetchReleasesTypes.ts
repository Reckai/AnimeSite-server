import { Field, InputType, Int, } from "type-graphql";
import { Prisma } from "@prisma/client";
import { GraphQLJSONObject } from "graphql-scalars";

export interface FilterConfig {
    relation: string;
}

export interface FilterParams {
    include?: string[];
    exclude?: string[];
}

@InputType()
class filters{
    
}

@InputType()
export class AnimeFilterParams {
    
    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => String, { nullable: true })
    cursor?: string;


    @Field(() => GraphQLJSONObject, { nullable: true })
    orderBy?: Prisma.AnimeOrderByWithRelationInput;

    @Field(() => GraphQLJSONObject, { nullable: true })
    filters?: Record<string, FilterParams>;
}