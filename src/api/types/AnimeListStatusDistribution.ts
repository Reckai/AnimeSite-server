import { ObjectType, Field } from "type-graphql";
import { AnimeStatus } from "./AnimeList";

@ObjectType()
export class AnimeListStatusDistribution {
  @Field(() => AnimeStatus)
  status: AnimeStatus;

  @Field(()=> Number)
  count: number;
}
