import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { FileUpload } from "graphql-upload-minimal";
import { GraphQLUpload } from "graphql-upload-minimal";

export enum ImageType {
    AVATAR = 'AVATAR',
    COVER = 'COVER',
    GENERAL = 'GENERAL'
}

registerEnumType(ImageType,{
    name: 'ImageType',
})

@ObjectType()
export class Image {
    @Field(()=> String)
    id: string;

    @Field(()=>String)
    filename: string;

    @Field(()=>String)
    originalName: string;

    @Field(()=> String)
    path:string;

    @Field(()=> String)
    mimeType: string;

    @Field(()=> Number)
    size: number
    
    @Field(() => Number, { nullable: true })
    width: number | null;

    @Field(() => Number, { nullable: true })
    height: number | null;

    @Field(()=> ImageType)
    type: ImageType;

    @Field(()=> String)
    url: string;

    @Field(()=> String, {nullable: true})
    thumbnailUrl?: string;

    @Field(()=> Date)
    createdAt: Date

    @Field(()=> Date)
    updatedAt: Date;

    @Field(()=> String)
    userId: string;

    @Field(() => String,{nullable:true})
    blurhash?: string;
}

@InputType()
export class ImageUploadInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;

  @Field(() => ImageType)
  type: ImageType;
}
@ObjectType()
export class ImageUploadResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Image, { nullable: true })
  image?: Image;

  @Field(() => String, { nullable: true })
  error?: string;
}