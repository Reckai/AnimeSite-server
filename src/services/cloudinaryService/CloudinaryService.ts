import { v2 as cloudinary} from 'cloudinary';
import { CloudinaryResponse } from '../../api/types/CloudinaryResponse';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export interface CloudinaryImage {
    url: string;
    width: number;
    height: number;
  }

export  type ImageSize = 'small' | 'medium' | 'full';

interface SizeConfig{ 
    width: number,
    height: number,
    crop: string,
}


const sizeConfig: Record<ImageSize,SizeConfig> ={
small: {width: 40,height:40, crop:'fill'},
medium: {width: 128, height: 128, crop:'fill'},
full:{width:0, height: 0, crop: 'scale'}
} 

export async function uploadToClodinary(file: Express.Multer.File) : Promise<CloudinaryResponse>{
    return new Promise((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream({
            folder:'Images',
            resource_type: 'auto',
        },(error, result)=>{
            if(error){
                console.log('Cloudinary upload error:', error)
                reject(new Error('Field to upload to Cloudinary'));
            }else{
                resolve(result  as CloudinaryResponse)
            }
        })

        const bufferStream = require('stream').Readable.from(file.buffer)
        bufferStream.pipe(uploadStream)
    })
}

const baseOptions ={
    format:'webp',
    quality:'auto',
    fetch_format:'auto'
}

export async function getCloudinaryImage(publicId:string,
    sizes: ImageSize[] = ['small', 'medium', 'full']
) : Promise<Partial<Record<ImageSize,CloudinaryImage>>>{
    try{
     const imagePromises = sizes.map(async (size)=>{
        const config = sizeConfig[size]
        const url = cloudinary.url(publicId,{
            ...baseOptions,
            ...config
        })

        if(size === 'full'){
            const fullImage = await cloudinary.api.resource(publicId,{colors:true})
            return [size,{url, width:fullImage.width, height: fullImage.height}]
        }

        return [size, {url, width: config.width, height: config.height}]
     })
     const images = await Promise.all(imagePromises)
     return Object.fromEntries(images) as Partial<Record<ImageSize,CloudinaryImage>>
    }catch(e){
        console.error('Error fetching Cloudinary images:',e)
        throw new Error('Failed to fetch images from Cloudinary')
    }
}

export async function deleteImageFromCloudinary(imageId:string) {
    try{
      await cloudinary.uploader.destroy(imageId)
      return 'Successful'   
    }catch(e){
        console.error('Could not delete Image:',e)
        throw new Error('Something Went Wrong')
    }
}