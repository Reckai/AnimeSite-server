import {AuthChecker, AuthenticationError} from "type-graphql";
import { Context } from "../../../context";




export const authChecker: AuthChecker<Context> =  async (
    {context: {req,userId}}) => {

    if (!req?.session.userId) {
        console.log(req?.session.userId,'userId AuthCheker')
        throw new AuthenticationError('not authenticated')
    }

    console.log("AuthChecker", req.session.userId, req.session.roles)
    userId=req.session.userId
    return true
}
