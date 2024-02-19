import { AuthChecker } from "type-graphql";
import {Context} from "../context";

import {getDataFromToken} from "../utils/utils";
import {Roles} from "../Roles/Roles";



export const authChecker: AuthChecker<Context> = (

    { context: { token } }) => {
    // Здесь мы можем прочитать пользователя из контекста
    // и проверить его разрешения в базе данных против аргумента `roles`
    // который приходит от декоратора `@Authorized`, например, ["ADMIN", "MODERATOR"]

    if (!token) {
        console.log('no token')
        return false;
    }
    const {userId, role} = getDataFromToken(token)
    console.log('role', role, typeof role)
    return Roles.includes(role)

};
