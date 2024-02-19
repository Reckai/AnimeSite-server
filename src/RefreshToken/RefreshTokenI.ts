import {Field, ObjectType} from "type-graphql";
import {Role} from "../Roles/Role";


@ObjectType()
export class RefreshTokenInput {
    @Field(()=>String)
    token: string;

    @Field(()=>Role)
    role: Role;

    @Field(()=>String)
    userId: string;
}
