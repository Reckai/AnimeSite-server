import { Resolver, Mutation, Arg, Ctx, UseMiddleware, Authorized } from 'type-graphql';
import { Service } from 'typedi';
import { ImageType, ImageUploadInput, ImageUploadResponse } from '../types/image.types';

import { Context } from '../../context';
import { imageService, ImageService } from '../../services/ImageService';

@Resolver()
export class ImageResolver {

  @Mutation(() => ImageUploadResponse)

  
  async uploadImage(
    @Arg('input', ()=> ImageUploadInput) input: ImageUploadInput,
    @Ctx() ctx: Context
  ): Promise<ImageUploadResponse> {
    try {
        const file = await input.file;
        const userId = ctx.req.session.userId!;
        
        const image = await imageService.processAndSaveImage({
          file,
          type: input.type,
          userId:'64f47e48-f5db-4c6e-9af0-d51a63011169'
        });
       console.log(image.id)
        // If this is an avatar, update the user's avatar
        if (input.type === ImageType.AVATAR) {
            console.log('acatar')
          await imageService.updateUserAvatar('64f47e48-f5db-4c6e-9af0-d51a63011169', image.id);
        }
        
        return {
          success: true,
          image
        };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }
  @Authorized(['USER','ADMIN'])
  @Mutation(() => Boolean)
  async DeleteAvatar(
    @Arg('userId', () => String) userId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    try{
      await imageService.deleteAvatar(userId);
      return true;
    }catch(error){
      return false;
    }
  }
}