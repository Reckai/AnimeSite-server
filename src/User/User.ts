import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";
import { AnimeList } from "../AnimeList/AnimeList";
import { Reply } from "../Reply/Reply";
import { Comment } from "../Comment/Comment";
import { Session} from "../Tokens/Session";
import { Role } from "../Roles/Role";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Session], { nullable: true })
  refreshToken?: Session[];

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Role, { nullable: true })
    role: Role;

  @Field(() => Date, { nullable: true })
  emailVerified?: Date;

    @Field(() => Date )
   createdAt: Date;


  @Field(() => [Reply], { nullable: true })
  replies?: Reply[];

  @Field(() => [AnimeList], { nullable: true })
  animeList?: AnimeList[];


}
