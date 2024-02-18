import 'reflect-metadata'
import {Field, ID, ObjectType} from "type-graphql";
import {User} from "../User/User";
import {Reply} from "../Reply/Reply";

@ObjectType()
export class Comment {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field()
    depth: number;

    @Field({ nullable: true })
    parentId?: string;

    @Field(() => [Reply], { nullable: true })
    replies?: Reply[];

    @Field({ nullable: true })
    threadId?: string;

    @Field()
    viewerCanDelete: boolean;

    @Field()
    viewerCanUpdate: boolean;

    @Field(() => [User], { nullable: true })
    author?: User[];
}
