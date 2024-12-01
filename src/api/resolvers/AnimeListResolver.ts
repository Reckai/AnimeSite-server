import 'reflect-metadata'

import {Arg, Authorized, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver,} from 'type-graphql'

import {GraphQLError} from "graphql";
import { CacheControl } from '../../cache-control';
import { AnimeList, AnimeStatus } from '../types/AnimeList';
import { Context } from '../../context';

@ObjectType()

@CacheControl({ maxAge: 60 })
class AnimeListInfo {
    @Field(() => AnimeStatus) status: AnimeStatus;

    @Field(() => Int) userCount: number;
}


@Resolver(AnimeList)

@CacheControl({ maxAge: 60 })
export class AnimeListResolver {


    @Query(() => [AnimeListInfo], {nullable: true})

    async getAnimeListInfo(@Arg('animeId', ()=>String) animeId: string, @Ctx() ctx: Context): Promise<AnimeListInfo[] | null> {


        try {
            const animeListInfo = await ctx.prisma.animeList.groupBy({
                by: ['status'], where: {
                    anime: {
                            id: animeId,

                    },
                }, _count: {
                    status: true,
                },
            });
            return animeListInfo.map((entry) => ({
                status: entry.status as AnimeStatus,
                userCount: entry._count.status,
            }));
        } catch (error) {
            console.error('Error fetching anime list info:', error);
            return null;
        }
    }
    @Authorized(['ADMIN', 'USER'])
    @Mutation(() => AnimeStatus)
    async changeStatusOfAnime(
        @Arg('animeId', () => String) animeId: string,
        @Arg('status', () => AnimeStatus) status: AnimeStatus,
        @Ctx() ctx: Context
    ): Promise<AnimeStatus> {
const userId= ctx.req.session.userId;
        try {
            const existingAnimeList = await ctx.prisma.animeList.findFirst({
                where: {
                    anime: {
                            id: animeId,

                    },
                    user: {

                            id: userId,

                    },
                },
            });
            let StatusOfAnime = AnimeStatus.WATCHING
            if (existingAnimeList) {
                await ctx.prisma.animeList.update({
                    where: { id: existingAnimeList.id },
                    data: { status },
                });
                StatusOfAnime = status
            } else {
                await ctx.prisma.animeList.create({
                    data: {
                        anime: { connect: { id: animeId } },
                        user: { connect: { id: userId } },
                        status: status,
                    },
                });
                StatusOfAnime = status
                console.log(`AnimeList for anime with id ${animeId} created successfully.`);
            }

            return StatusOfAnime;
        } catch (error) {
            console.error(`Error changing status of AnimeList for anime with id ${animeId}: ${error}`);
            throw new GraphQLError('Something went wrong');
        }
    }
    @Authorized(['ADMIN', 'USER'])
    @Mutation(() => Boolean)
    async deleteAnimeStatus(
        @Arg('animeId', () => String) animeId: string,

        @Ctx() ctx: Context
    ): Promise<boolean> {

        if (!ctx.userId) {
            throw new GraphQLError("You must be logged in to query this schema", {
                extensions: {
                    code: 'UNAUTHENTICATED',
                },
            });
        }
        console.log('userId', ctx.userId)
        try {
            const existingAnimeList = await ctx.prisma.animeList.findFirst({
                where: {
                    anime: {
                            id: animeId,

                    },
                    user: {
                            id: ctx.userId,
                    },
                },
            });

            if (existingAnimeList) {
                await ctx.prisma.animeList.delete({
                    where: { id: existingAnimeList.id },

                });
            }

            return true;
        } catch (error) {
            console.error(`Error changing status of AnimeList for anime with id ${animeId}: ${error}`);
            throw new GraphQLError('Something went wrong');
        }
    }
};




// export class UserResolver {
//  @FieldResolver()
//  async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[] | null> {
//   return ctx.prisma.user
//       .findUnique({
//        where: {
//         id: user.id,
//        },
//       })
//       .posts()
//  }
//
//  @Mutation((returns) => User)
//  async signupUser(
//      @Arg('data') data: UserCreateInput,
//      @Ctx() ctx: Context,
//  ): Promise<User> {
//   const postData = data.posts?.map((post) => {
//    return { title: post.title, content: post.content || undefined }
//   })
//
//   return ctx.prisma.user.create({
//    data: {
//     email: data.email,
//     name: data.name,
//     posts: {
//      create: postData,
//     },
//    },
//   })
//  }
//
//  @Query(() => [User])
//  async allUsers(@Ctx() ctx: Context) {
//   return ctx.prisma.user.findMany()
//  }
//
//  @Query((returns) => [Post], { nullable: true })
//  async draftsByUser(
//      @Arg('userUniqueInput') userUniqueInput: UserUniqueInput,
//      @Ctx() ctx: Context,
//  ) {
//   return ctx.prisma.user
//       .findUnique({
//        where: {
//         id: userUniqueInput.id || undefined,
//         email: userUniqueInput.email || undefined,
//        },
//       })
//       .posts({
//        where: {
//         published: false,
//        },
//       })
//  }
// }
