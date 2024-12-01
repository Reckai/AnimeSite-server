import {Field, ID, Int, ObjectType} from "type-graphql";
import {User} from "./User";
import {Comment} from "./Comment";

@ObjectType()
export class Reply {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    content: string;

    @Field(() => [User], { nullable: true })
    author?: User[];

    @Field(() => Int)
    depth: number;

    @Field(() => String, { nullable: true })
    parentId?: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Boolean)
    viewerCanDelete: boolean;

    @Field(() => Boolean)
    viewerCanUpdate: boolean;

    @Field(() => String, { nullable: true })
    threadId?: string;

    @Field(() => [Comment], { nullable: true })
    comments?: Comment[];
}
