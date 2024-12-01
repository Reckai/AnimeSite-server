import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";
import { AnimeList } from "./AnimeList";
import { Reply } from "./Reply";
import { Comment } from "./Comment";
import { Session } from "../../Tokens/Session";
import { Role } from "./Role";
import { Image } from "./image.types";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => Image, { nullable: true })
  currentAvatar?: Image | null;

  @Field(() => String, { nullable: true })
  avatarId?: string | null;

  @Field(() => [Image], { nullable: true })
  images?: Image[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Session], { nullable: true })
  refreshToken?: Session[];

  @Field(() => Role)
  role: Role;

  @Field(() => Date, { nullable: true })
  emailVerified?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Reply], { nullable: true })
  replies?: Reply[];

  @Field(() => [AnimeList], { nullable: true })
  animeList?: AnimeList[];

  @Field(() => [Account], { nullable: true })
  accounts?: Account[];
}

@ObjectType()
class Account {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  provider: string;

  @Field(() => String)
  providerAccountId: string;

  @Field(() => String, { nullable: true })
  refresh_token?: string;

  @Field(() => String, { nullable: true })
  access_token?: string;

  @Field(() => Number, { nullable: true })
  expires_at?: number;

  @Field(() => String, { nullable: true })
  token_type?: string;

  @Field(() => String, { nullable: true })
  scope?: string;

  @Field(() => String, { nullable: true })
  id_token?: string;

  @Field(() => String, { nullable: true })
  session_state?: string;
}
