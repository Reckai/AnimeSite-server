import { ObjectType, Field } from "type-graphql";
import { AnimeStatus } from "../AnimeList/AnimeList";

@ObjectType()
export class AnimeListStatusDistribution {
  @Field(() => AnimeStatus)
  status: AnimeStatus;

  @Field()
  count: number;
}
