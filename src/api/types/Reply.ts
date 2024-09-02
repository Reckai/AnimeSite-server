import {Field, ID, Int, ObjectType} from "type-graphql";
import {User} from "./User";
import {Comment} from "./Comment";

@ObjectType()
export class Reply {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field(() => [User], { nullable: true })
    author?: User[];

    @Field(() => Int)
    depth: number;

    @Field({ nullable: true })
    parentId?: string;

    @Field()
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field()
    viewerCanDelete: boolean;

    @Field()
    viewerCanUpdate: boolean;

    @Field({ nullable: true })
    threadId?: string;

    @Field(() => [Comment],)
    comments?: Comment[];
}
