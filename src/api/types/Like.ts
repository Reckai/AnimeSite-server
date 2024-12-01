import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Like {
  @Field(() => User)
  user: User;

  @Field(()=>String)
  userId: string;

  @Field(()=>String)
  commentId: string;
}
