import 'reflect-metadata'
import {Resolver} from "type-graphql";

import {Comment} from "./Comment";


@Resolver(Comment)
export class CommentResolver{}
