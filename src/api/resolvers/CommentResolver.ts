import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx, Authorized, Query, Int, ObjectType, FieldResolver, Root } from "type-graphql";
import { GraphQLError } from "graphql";
import { Comment } from "../types/Comment";
import { Context } from "../../context";
import { SortOrder } from '../types/SortOrder'


@ObjectType()
class getCommentsResponse extends Comment{
    isUserLikedThisComment:boolean
}

@Resolver(Comment)
export class CommentResolver {
    @Authorized(["USER", "ADMIN"])
    @Mutation(() => Comment)
    async createComment(
        @Arg('message',()=>String) message: string,
        @Arg('animeId',()=>String) animeId: string,
        @Ctx() ctx: Context,
        @Arg('parentId',()=>String, { nullable: true }) parentId?: string
    ): Promise<Comment> {
        const userId = ctx.req.session.userId;

        if (!userId) {
            throw new GraphQLError("You must be logged in to create a comment", {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }
        if(!message){
            throw new GraphQLError('You mast provide message to crate comment',{
                extensions:{ code: 'BAD REQUEST'}
            })
        }
        if(!animeId){
            throw new GraphQLError('You must provide animeId')
        }
        console.log(parentId)
        try {
            const newComment = await ctx.prisma.comment.create({
                data: {
                    message,
                    animeId,
                    userId,
                    parentId,
                    
                },
                include: {
                    user: true,
                    anime: true,
                    parent: true,
                    children: true,
                    likes: true,
                },
            });

            return newComment as unknown as Comment;
        } catch (error) {
            console.error("Error creating comment:", error);
            throw new GraphQLError("Failed to create comment", {
                extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
        }
    }

    @FieldResolver(() => Boolean)
    
    async isUserLikeComment(
        @Root() comment: Comment,
        @Ctx() ctx: Context
    ): Promise<boolean> {
        const userId = ctx.req.session.userId;

        if (!userId) {
            return false;
        }

        try {
            const like = await ctx.prisma.like.findUnique({
                where: {
                    userId_commentId: {
                        userId,
                        commentId:comment.id,
                    },
                },
            });

            return !!like;
        } catch (error) {
            console.error("Error checking user like:", error);
            throw new GraphQLError("Failed to check user like", {
                extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
        }
    }
    @Authorized(["USER", "ADMIN"])
    @Mutation(() => Comment)
    async updateComment(
        @Arg('commentId',()=>String) commentId: string,
        @Arg('message',()=>String) message: string,
        @Ctx() ctx: Context
    ): Promise<Comment> {
        const userId = ctx.req.session.userId;

        if (!userId) {
            throw new GraphQLError("You must be logged in to update a comment", {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        if (!message) {
            throw new GraphQLError('You must provide a message to update the comment', {
                extensions: { code: 'BAD_REQUEST' },
            });
        }

        try {
            const comment = await ctx.prisma.comment.findUnique({
                where: { id: commentId },
            });

            if (!comment) {
                throw new GraphQLError('Comment not found', {
                    extensions: { code: 'NOT_FOUND' },
                });
            }

            if (comment.userId !== userId) {
                throw new GraphQLError('You can only update your own comments', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            const updatedComment = await ctx.prisma.comment.update({
                where: { id: commentId },
                data: { message },
                include: {
                    user: true,
                    anime: true,
                    parent: true,
                    children: true,
                    likes: true,
                },
            });

            return updatedComment as unknown as Comment;
        } catch (error) {
            console.error("Error updating comment:", error);
            throw new GraphQLError("Failed to update comment", {
                extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
        }
    }

    @Authorized(["USER", "ADMIN"])
    @Mutation(() => Number)
    async likeComment(
        @Arg('commentId',()=>String) commentId: string,
        @Ctx() ctx: Context
    ): Promise<number> {
        const userId = ctx.req.session.userId;
        console.log('ok')
        if (!userId) {
            throw new GraphQLError("You must be logged in to like a comment", {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        try {
           const likesCount = await ctx.prisma.like.count({
            where:{
                commentId: commentId
            }
           })
           
            
           const existingLike = await ctx.prisma.like.findFirst({
            where:{
                commentId,
                userId,
            }
           })
           if(!existingLike){
            await ctx.prisma.like.create({
                data: {
                    commentId,
                    userId,
                },
            });
            console.log(likesCount +1)
            return likesCount + 1;
           }
           
           await ctx.prisma.like.delete({
            where:{
                userId_commentId :{
                 userId: existingLike.userId,
                 commentId:existingLike.commentId
                }
            }
           })
 
        console.log(likesCount - 1)          
           return likesCount -1;
        } catch (error) {
            console.error("Error liking comment:", error);
            throw new GraphQLError("Failed to like comment", {
                extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
        }
    }
    @FieldResolver(() => Boolean)
    async userCanDelete(@Root() comment: Comment, @Ctx() ctx: Context): Promise<boolean> {
        const userId = ctx.req.session.userId;
        return userId === comment.userId;
    }


@FieldResolver(() => Boolean)
async userCanUpdate(@Root() comment: Comment, @Ctx() ctx: Context): Promise<boolean> {
    const userId = ctx.req.session.userId;
    return userId === comment.userId;
}
    @Authorized(['USER','ADMIN'])
    @Mutation(() => Comment)
    async deleteComment(
        @Arg("commentId",()=>String) commentId: string,
        @Ctx() ctx: Context
    ): Promise<Comment> {
        try {
            const userId = ctx.req.session.userId;
            if (!userId) {
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }

            const comment = await ctx.prisma.comment.findUnique({
                where: { id: commentId },
            });

            if (!comment) {
                throw new GraphQLError("Comment not found", {
                    extensions: { code: 'NOT_FOUND' },
                });
            }

            if (comment.userId !== userId) {
                throw new GraphQLError("Not authorized to delete this comment", {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            await ctx.prisma.comment.delete({
                where: { id: commentId },
            });

            return comment as Comment;
        } catch (error) {
            console.error("Error deleting comment:", error);
            throw new GraphQLError("Failed to delete comment", {
                extensions: { code: 'INTERNAL_SERVER_ERROR' },
            });
        }   
    }


    @Query(() => [Comment])
    async getCommentsByAnimeId(
        @Arg("slug",()=>String) slug: string,
        @Ctx() ctx: Context,
        @Arg("orderBy", () => SortOrder, { nullable: true }) orderBy?: SortOrder,
      
      
    ): Promise<Comment[]> {
        try {
            const comments = await ctx.prisma.comment.findMany({
                where: { anime: { slug } },
                orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: "desc" },
               
                include: {
                    user: true,
                    anime:{
                        select:{
                            slug:true
                        }
                    },
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
