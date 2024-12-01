import { FileUpload } from "graphql-upload-minimal";
import { Service } from "typedi";
import { mkdir, unlink } from "fs/promises";
import path from "path";
import { v4 } from "uuid";
import sharp from "sharp";
import { encode } from "blurhash";
import { createWriteStream } from "fs";
import { context, Context } from "../context";
import { Image, ImageType } from "../api/types/image.types";

interface ImageConfig {
    uploadDir: string;
    maxFileSize: number;
    allowedMimeTypes: string[];
    thumbnailSize: number;
    blurhashWidth: number;  // Add this
    blurhashHeight: number;
  }

  interface ImageProcessingOptions {
    file: FileUpload;
    type: ImageType;
    userId: string;
  }
  

export class ImageService {
    private readonly config:ImageConfig;
    private readonly prisma: Context['prisma'];

    constructor(){
        this.config = {
            uploadDir:'public/images',
            'maxFileSize': 5 *1024 * 1024,
            allowedMimeTypes: ['image/jpeg', 'image/png','image/webp','image/jpg'],
            thumbnailSize:1500,
            blurhashWidth: 40,    // Add this
            blurhashHeight: 40 
        }
        this.prisma = context.prisma;
        this.initialize()
    }
    private async initialize(): Promise<void> {
        await this.ensureUploadDirectoryExists();
      }
    private async ensureUploadDirectoryExists(): Promise<void> {
        await mkdir(this.config.uploadDir, { recursive: true });
    }

    private generateUniqeFilename(originalFilename:string):string{
        const ext = path.extname(originalFilename);
        return `${v4()}${ext}`
    }
    private getUploadPath(type:ImageType):string{
        const typeFolder = type.toLocaleLowerCase();
        return path.join(this.config.uploadDir, typeFolder);
    }

    private async validateFile(file:FileUpload):Promise<void>{
        const {mimetype} = file;

        console.log('Received file type:', mimetype);
        console.log('Allowed types:', this.config.allowedMimeTypes);

        if(!this.config.allowedMimeTypes.includes(mimetype.toLowerCase())){
            throw new Error (`Invalid file type. Allowed types: ${this.config.allowedMimeTypes.join(', ')}`)
        }
        
    }

    private async createThumbnail(
        pipeline: sharp.Sharp,
        uploadPath: string,
        filename: string,
        type: ImageType,
        outputOptions: any
    ): Promise<string|null> {
        const thumbnailFilename = `thumb_${filename}`;
        const thumbnailPath = path.join(uploadPath, thumbnailFilename);

        await pipeline
            .resize(this.config.thumbnailSize, this.config.thumbnailSize, {
                fit: 'cover',
                position: 'center',
                kernel: sharp.kernel.lanczos3, // Better quality scaling
                withoutEnlargement: true
            })
            .withMetadata()
            .toFormat('webp', outputOptions.webp)
            .toFile(thumbnailPath);

        return `/images/${type.toLocaleLowerCase()}/${thumbnailFilename}`;  
    }

      private async generateBlurhash(pipeline: sharp.Sharp): Promise<string> {
    try {
      const { data, info } = await pipeline.clone().raw().ensureAlpha().resize(32, 32, { fit: 'inside' }).toBuffer({
        resolveWithObject: true
      });
      // Convert Buffer to Uint8ClampedArray
      const uint8ClampedArray = new Uint8ClampedArray(data.buffer);
      const blurhash = encode(uint8ClampedArray, info.width, info.height, 4, 4);
      return blurhash;
    } catch (error) {
      console.error('Failed to generate blurhash:', error);
      return '';
    }
  }
    private async saveImageMetadata(params:{
        filename: string;
        originalName: string;
        relativePath: string;
        mimeType: string;
        metadata: sharp.Metadata;
        type: ImageType;
        url: string;
        thumbnailUrl: string | null;
        userId: string;
        blurhash: string;
    }):Promise<Image>{
        const {filename,originalName, relativePath, metadata,mimeType,type,url,thumbnailUrl,userId,blurhash} = params;
        console.log(url)
        return this.prisma.image.create({
            data: {
                filename,
                originalName,
                path: relativePath,
                mimeType,
                size: metadata.size || 0,
                width: metadata.width || null,
                height: metadata.height || null,
                type,
                url,
                thumbnailUrl,
                userId,
                blurhash
            }
        }) as unknown as Image;
    }

    private async deleteFile(path: string): Promise<void> {
        await unlink(path);
    }


    public async processAndSaveImage({file, type, userId}: ImageProcessingOptions): Promise<Image> {
        try {
            const {createReadStream, filename: originalFilename, mimetype} = file;
            
            // Validate mime type
            if(!this.config.allowedMimeTypes.includes(mimetype.toLowerCase())){
                throw new Error(`Invalid file type. Allowed types: ${this.config.allowedMimeTypes.join(', ')}`)
            }

            const filename = this.generateUniqeFilename(originalFilename);
            const uploadPath = this.getUploadPath(type);
            await mkdir(uploadPath, {recursive: true});

            const filePath = path.join(uploadPath, filename);
            const relativePath = path.join(type.toLowerCase(), filename);

            // Read the stream ONCE into a buffer
            const stream = createReadStream();
            const buffer = await new Promise<Buffer>((resolve, reject) => {
                const chunks: Buffer[] = [];
                let size = 0;
                
                stream.on('data', (chunk: Buffer) => {
                    size += chunk.length;
                    if (size > this.config.maxFileSize) {
                        reject(new Error(`File too large. Maximum size: ${this.config.maxFileSize / 1024 / 1024}MB`));
                    }
                    chunks.push(chunk);
                });
                
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', reject);
            });

            // Configure Sharp with quality settings
            const sharpInstance = sharp(buffer, {
                failOnError: false,
                density: 300 // For higher DPI images
            });

            // Optimize based on image type
            const outputOptions = {
                jpeg: { quality: 100, mozjpeg: true },
                webp: { quality: 100, lossless: true },
                png: { 
                    compressionLevel: 9,
                    palette: true,
                    quality: 100,
                    effort: 10 // max compression effort
                }
            };

            // Save original image with optimal quality
            await sharpInstance
                .withMetadata() // preserve metadata
                .toFormat('webp', outputOptions.webp) // convert to WebP for best quality/size ratio
                .toFile(filePath);

            // If creating thumbnail, maintain quality
            const thumbnailUrl = type === ImageType.AVATAR ? 
                await this.createThumbnail(
                    sharpInstance.clone(),
                    uploadPath,
                    filename,
                    type,
                    outputOptions
                ) : null;

            // Generate blurhash
            const blurhash = await this.generateBlurhash(sharpInstance.clone());

            return await this.saveImageMetadata({
                filename,
                originalName: originalFilename,
                relativePath,
                mimeType: mimetype,
                metadata: await sharpInstance.metadata(),
                type,
                url: `/images/${relativePath}`,
                thumbnailUrl,
                userId,
                blurhash
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to process image: ${error.message}`);
            }
            throw new Error('Failed to process image: Unknown error');
        }
    }

    public async updateUserAvatar(userId: string, imageId: string): Promise<void> {
        // Start a transaction to ensure data consistency
        await this.prisma.$transaction(async (tx) => {
            // Get the old avatar if exists
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { avatarId: true }
            });


            // Delete old avatar if exists
            if (user?.avatarId) {
                const oldAvatar = await tx.image.findUnique({
                    where: { id: user.avatarId },
                    select: { filename: true, type: true }
                });
              console.log(oldAvatar)
                if (oldAvatar && oldAvatar.type === ImageType.AVATAR) {
                    // Delete the file
                    const oldPath = path.join(this.config.uploadDir, 'avatar', oldAvatar.filename);
                    const oldThumbPath = path.join(this.config.uploadDir, 'avatar', `thumb_${oldAvatar.filename}`);
                    
                    try {
                        await unlink(oldPath);
                        await unlink(oldThumbPath);
                    } catch (error) {
                        console.error('Error deleting old avatar files:', error);
                    }

                    // Delete the database record
                    await tx.image.delete({
                        where: { id: user.avatarId }
                    });
                }
            }
                        // Update user with new avatar
                        await tx.user.update({
                            where: { id: userId },
                            data: { avatarId: imageId }
                        });
            
        });
    }


    public async deleteAvatar( userId: string): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { avatarId: true }
            });


            // Delete old avatar if exists
            if (user?.avatarId) {
                const oldAvatar = await tx.image.findUnique({
                    where: { id: user.avatarId },
                    select: { filename: true, type: true }
                });
              console.log(oldAvatar)
                if (oldAvatar && oldAvatar.type === ImageType.AVATAR) {
                    // Delete the file
                    const oldPath = path.join(this.config.uploadDir, 'avatar', oldAvatar.filename);
                    const oldThumbPath = path.join(this.config.uploadDir, 'avatar', `thumb_${oldAvatar.filename}`);
                    
                    try {
                        await this.deleteFile(oldPath);
                        await this.deleteFile(oldThumbPath);
                    } catch (error) {
                        console.error('Error deleting old avatar files:', error);
                    }

                    // Delete the database record
                    await tx.image.delete({
                        where: { id: user.avatarId }
                    });
                }
            }
          
    
    })
    }
}
export const imageService = new ImageService();