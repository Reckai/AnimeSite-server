import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Like {
  @Field(() => User)
  user: User;

  @Field()
  userId: string;

  @Field()
  commentId: string;
}
