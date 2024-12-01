import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Anime } from './Anime';
import { Like } from './Like';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  message: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  parentId: string | null;

  @Field(() => User)
  user: User;

  @Field(() => String)
  userId: string;

  @Field(() => Anime)
  anime: Anime;

  @Field(() => String)
  animeId: string;

  @Field(() => Comment, { nullable: true })
  parent?: Comment;

  @Field(() => [Comment])
  children: Comment[];

  @Field(() => [Like])
  likes: Like[];
}
