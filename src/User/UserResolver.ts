import 'reflect-metadata'
import {Arg, Ctx, Field, InputType, Mutation, Resolver} from "type-graphql";
import {User} from "./User"
import {Context} from "../context";

@InputType()
class UserInput {
    @Field()
    email: string;

    @Field({ nullable: true })
    name?: string;

    @Field()
    password: string;
}
@Resolver(User)
export class UserResolver {
    @Mutation((returns) => User)
    async signupUser(
        @Arg('data') data: UserInput,
        @Ctx() ctx: Context,
    ): Promise<User> {

       return  await ctx.prisma.user.create({
               data: {
                   email: data.email,
                   name: data.name,
                   password: data.password
               },
           })





}}

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

