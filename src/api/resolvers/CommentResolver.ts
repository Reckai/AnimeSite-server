import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx, Authorized, Query, Int } from "type-graphql";
import { GraphQLError } from "graphql";
import { Comment } from "../types/Comment";
import { Context } from "../../context";
import { SortOrder } from '../types/SortOrder'

@Resolver(Comment)
export class CommentResolver {
    @Authorized(["USER", "ADMIN"])
    @Mutation(() => Comment)
    async createComment(
        @Arg('message') message: string,
        @Arg('animeId') animeId: string,
        @Ctx() ctx: Context,
        @Arg('parentId', { nullable: true }) parentId?: string
    ): Promise<Comment> {
        const userId = ctx.req.session.userId;

        if (!userId) {
            throw new GraphQLError("You must be logged in to create a comment", {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        try {
            const newComment = await ctx.prisma.comment.create({
                data: {
                    message,
                    animeId,
                    userId,
                    parentId,
                    viewerCanDelete: true,
                    viewerCanUpdate: true,
                },
                include: {
                    user: true,
                    anime: true,
                    parent: true,
                    children: true,
                    likes: true,
                },
            });

            return newComment as Comment;
        } catch (error) {
            console.error("Error creating comment:", error);
            throw new GraphQLError("Failed to create comment", {
                extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
        }
    }

    @Query(() => [Comment])
    async getCommentsByAnimeId(
        @Arg("animeId") animeId: string,
        @Ctx() ctx: Context,
        @Arg("orderBy", () => SortOrder, { nullable: true }) orderBy?: SortOrder,
      
      
    ): Promise<Comment[]> {
        try {
            const comments = await ctx.prisma.comment.findMany({
                where: { animeId },
                orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: "desc" },
               
                include: {
                    user: true,
                    likes: true,
                    children: true,
                },
            });

            return comments as unknown as Comment[];
        } catch (error) {
            console.error("Error fetching comments:", error);
            throw new GraphQLError("Failed to fetch comments", {
                extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
        }
    }
}
