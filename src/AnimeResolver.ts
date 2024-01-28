import 'reflect-metadata'

import {
 Resolver,
 Query,
 Mutation,
 Arg,
 Ctx,
 FieldResolver,
 Root,
 Int,
 InputType,
 Field,
} from 'type-graphql'

import { Context } from './context'

import {Anime} from "./Anime";


@Resolver(Anime)
export class AnimeResolver {



 @Query(() => [Anime])
 async allAnimes (@Ctx() ctx: Context) {
  console.log(1)
 return  ctx.prisma.anime.findMany({include: {genres: true, studios: true, poster: true}})

 }

 @Query(() => Anime)
 async anime (@Arg('slug') slug: string, @Ctx() ctx: Context) {
  return ctx.prisma.anime.findUnique({
   where:{
    slug: slug
   }
  })
 }


}


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
