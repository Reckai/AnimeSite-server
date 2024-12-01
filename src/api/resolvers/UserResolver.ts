

import 'reflect-metadata'
import {Arg, Authorized, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver} from "type-graphql";

import bcrypt from 'bcryptjs';

import {GraphQLError} from "graphql";
import { VerificationToken } from '@prisma/client';
import { User } from '../types/User';
import { Context } from '../../context';
import { generateVerificationToken } from '../../VerificationToken/Service/VerificationTokenService';
import { sendVerificationEmail } from '../../Resend/ResendService';
import { changeNickName } from '../../User/Service/ChangeService/ChangeService';



@InputType()
class UserLoginInput {
    @Field(()=>String) email: string;
    @Field(()=>String) password: string;
}



@ObjectType()
class AuthPayload {
    @Field(()=>User) user : User};

@Resolver(User)
export class UserResolver {
    @Mutation((returns) => String)
    async signupUser(@Arg('email',()=> String) email: string, @Arg('password',()=>String) password: string,  @Ctx() ctx: Context,): Promise<String> {
       const userExists = await ctx.prisma.user.findUnique({
           where: {
               email: email
           }
       })
       if (userExists) {
                throw new GraphQLError('User already exists')
            }
        const hashedPassword = await bcrypt.hash(password, 10)
        const nameFromEmail = email.split('@')[0]
        const user  = await ctx.prisma.user.create({
            data: {email, password: hashedPassword, name: nameFromEmail, createdAt: new Date()},
        })

        const verificationToken = await generateVerificationToken(user.email) as VerificationToken
        await sendVerificationEmail( verificationToken.email, verificationToken.token)


        return 'Check your email for verification link'
    }



    @Mutation((returns) => AuthPayload)
    async loginUser(@Arg('args',()=> UserLoginInput) args: UserLoginInput, @Ctx() ctx: Context,): Promise<AuthPayload | String>  {
try {


    const user = await ctx.prisma.user.findUnique({
        where: {
            email: args.email
        },

    })

    if (!user) {
        throw new GraphQLError('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password??"")
    if (!valid) {
        throw new GraphQLError('Invalid password or email')
    }
    if(!user.emailVerified){
        const verificationToken = await generateVerificationToken(user.email) as VerificationToken
        await sendVerificationEmail(verificationToken.email, verificationToken.token )
        throw new GraphQLError('Email not verified, check your email for verification link')
    }

    ctx.req.session.userId = user.id;
    ctx.req.session.roles = ['USER'];
    return {
        user: user as User
    }
} catch (error) {
 if(error instanceof GraphQLError){
     throw error
 }
 throw new GraphQLError('Somethssssing went wrong')
}
    }
    @Authorized(['ADMIN', 'USER'])
    @Query((returns) => User)
    async me(@Ctx() ctx: Context) {
        const userId = ctx.req.session.userId;

        return  ctx.prisma.user.findUnique({
            where: {
                id: userId
            },
            select:{
                id: true,
                email: true,
                name: true,
                avatarId: true,
                currentAvatar:true,
                role: true,
                createdAt: true,
            }

        })

    }

    @Mutation((returns) => Boolean)
    async  deleteAllUsers(@Ctx() ctx: Context,) {
       try{
           await ctx.prisma.animeList.deleteMany({
               where: {
                   user: {
                           id: {
                               not: undefined
                           }

                   },
               },
           });
           await ctx.prisma.user.deleteMany()
           return true
       }catch (e){
           console.log(e)
           return false
       }

    }
    // @Authorized(['ADMIN', 'USER'])
    // @Mutation(() => Boolean)
    // async deleteAvatar(@Ctx() ctx: Context): Promise<boolean> {
    // try{
    //     const userId = ctx.req.session.userId;
    //     const avatar = await ctx.prisma.avatar.findUnique({
    //         where: {
    //             userId
    //         }
    //     })
    //     if(!avatar){
    //         throw new GraphQLError('No avatar', {extensions:{code:404}})
    //     }
    //     await deleteImageFromCloudinary(avatar.cloudinaryPublicId)
    //     await ctx.prisma.avatar.delete({
    //         where:{
    //             id:avatar.id
    //         }
    //     })
    //     return true;
    // }catch(e){
    //     console.error('Cennot Delete Image:', e)
    //     throw new GraphQLError('Cannot delete Avatart',{extensions:{code:'500'}})
    // }
    // }

    // @Authorized(['ADMIN', 'USER'])
    // @Mutation(()=>ImageResponse)
    // async uploadAvatar(@Arg('image')image:UploadImageInput, @Arg('userId',()=>String)userId:string):Promise<Image>{
    //     if(!userId || !image){
    //         throw new GraphQLError('Please provide correct data',{extensions:{code:400}})
    //     }
    //     const buffer = Buffer.from(image.base64,'base64')
    //     const multerFile: Express.Multer.File = {
    //         fieldname: 'image',
    //         originalname: image.filename,
    //         stream: null as any,
    //         encoding: image.encoding.toString(),
    //         buffer,
    //         path:null as any,
    //         filename: null as any,
    //         size: buffer.length,
    //         destination: null as any,
    //         mimetype: image.mimetype
    //     }
    //     return saveAvatar(multerFile, userId)
    // }

    @Authorized(['ADMIN', 'USER'])
    @Mutation(()=> Boolean)
    async changeNickName(@Arg('newNickName',()=>String) newNickName:string, @Ctx()ctx:Context):Promise<Boolean>{
        try{
            const userId = ctx.req.session.userId;
            if(!userId){
                throw new GraphQLError('Not Authorized',{extensions:{code:403}})
            }
            return changeNickName(newNickName, userId)
        }catch(e){
            console.error('Cant change nickName', e)
            throw new GraphQLError('Something went wrong')
        }
    }
    

    



    @Authorized(['ADMIN', 'USER'])
    @Mutation(()=> Boolean)
    async setNewPassword
    (@Arg('oldPassword', ()=> String) oldPassword: string,@Arg('newPassword',()=>String) newPassword:string,  @Ctx()ctx:Context):Promise<Boolean>{
         try {
             const userId = ctx.req.session.userId
             if(!userId){
                throw new Error('Not Authorized')
             }
    const user = await ctx.prisma.user.findUnique({
        where: {
            id: userId
        },

    })

    if (!user) {
        throw new GraphQLError('No such user found')
    }

    const valid = await bcrypt.compare(oldPassword, user.password??"")
    if(!valid){
        throw new Error('Password isn`t right')
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
        
    await ctx.prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            password:hashedPassword
        }
    })
 return true
         } catch (error) {
            throw new GraphQLError(`${error}`,{extensions:{code:403}})
         }
    }


    @Authorized(['ADMIN', 'USER'])
    @Mutation(()=> Boolean)
    async setNewEmail
    (@Arg('password', ()=> String) password: string,@Arg('newEmail',()=>String) newEmail:string,  @Ctx()ctx:Context):Promise<Boolean>{
         try {
             const userId = ctx.req.session.userId
             if(!userId){
                throw new Error('Not Authorized')
             }
    const user = await ctx.prisma.user.findUnique({
        where: {
            id: userId
        },

    })

    if (!user) {
        throw new GraphQLError('No such user found')
    }

    const valid = await bcrypt.compare(password, user.password??"")
    if(!valid){
        throw new Error('Password isn`t right')
    }
    
    await ctx.prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            email:newEmail
        }
    })
 return true
         } catch (error) {
            throw new GraphQLError(`${error}`,{extensions:{code:403}})
         }
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

