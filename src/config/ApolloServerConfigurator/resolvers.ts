import {AnimeResolver} from "../../api/resolvers/AnimeResolver";
import {AnimeListResolver} from "../../api/resolvers/AnimeListResolver";
import {CommentResolver}  from "../../api/resolvers/CommentResolver"
import {AuthResolver} from '../../api/resolvers/Auth';
import {VerificationTokenResolver} from '../../api/resolvers/VerifictationTokenResolver'
import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "../../api/resolvers/UserResolver";
const resolvers: NonEmptyArray<Function> = [AnimeResolver, AnimeListResolver, CommentResolver, VerificationTokenResolver ,UserResolver, AuthResolver] 
export default resolvers