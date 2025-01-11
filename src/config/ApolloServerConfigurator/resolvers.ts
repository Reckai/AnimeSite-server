import {AnimeResolver} from "../../api/resolvers/AnimeResolver";
import {AnimeListResolver} from "../../api/resolvers/AnimeListResolver";
import {CommentResolver}  from "../../api/resolvers/CommentResolver"
import {AuthResolver} from '../../api/resolvers/Auth';
import {VerificationTokenResolver} from '../../api/resolvers/VerifictationTokenResolver'
import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "../../api/resolvers/UserResolver";
import { ImageResolver } from "../../api/resolvers/ImageResolver";
import { FilterAnimeResolver } from "../../api/resolvers/FilterAnime.resolver";
const resolvers: NonEmptyArray<Function> = [AnimeResolver, AnimeListResolver, CommentResolver, VerificationTokenResolver ,UserResolver, ImageResolver, AuthResolver, FilterAnimeResolver ] 
export default resolvers