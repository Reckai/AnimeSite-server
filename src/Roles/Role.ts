import {registerEnumType} from "type-graphql";

export enum Role {

    USER = 'USER',
    ADMIN = 'ADMIN',
}

registerEnumType(Role, {
    name: 'UsersRoles', description: 'Users roles in the system',
});
