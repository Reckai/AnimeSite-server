import { PrismaPromise } from "@prisma/client";
import {Context} from "../../context";
import {AnimeResponse} from "../AnimeResolver";
import {Anime} from "../Anime";


export const getAnimes = async ( skip:number,safeLimit:number, context: Context) => {
    const [items, totalCount]    = await Promise.all([
      context.prisma.anime.findMany({
            include: {
                genres: true, studios: true, poster: true, animeLists: true, _count: {select: {animeLists: true}}
            }, skip, take: safeLimit
        }),
        context.prisma.anime.count()
    ] as unknown as  [ PrismaPromise<Omit<Anime, 'userWatchListStatusDistributions'> []>, PrismaPromise<number>])

    return [items,totalCount]
}
