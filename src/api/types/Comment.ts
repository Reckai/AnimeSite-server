import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Anime } from './Anime';
import { Like } from './Like';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  parentId: string | null;

  @Field()
  viewerCanDelete: boolean;

  @Field()
  viewerCanUpdate: boolean;

  @Field(() => User)
  user: User;

  @Field()
  userId: string;

  @Field(() => Anime)
  anime: Anime;

  @Field()
  animeId: string;

  @Field(() => Comment, { nullable: true })
  parent?: Comment;

  @Field(() => [Comment])
  children: Comment[];

  @Field(() => [Like])
  likes: Like[];
}

