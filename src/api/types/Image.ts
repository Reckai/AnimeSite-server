// import {Field, ID, InputType, Int, ObjectType} from "type-graphql";

// @ObjectType()
// export class CloudinaryImage{
//  @Field(()=> String)
//  url!: string;
//  @Field(()=> Int)
//  width!: number
//  @Field(()=>Int)
//  height!:number;
// }




// @ObjectType()
// export class Image {
//     @Field(() => ID)
//     id!: string;

//     @Field(() => String)
//     name!: string;

//     @Field(() => String)
//     cloudinaryPublicId!: string

//     @Field(()=> String)
//     mimeType!: string

//     @Field(()=>Int)
//     size!: number

//     @Field(()=> Date)
//     createdAt!:Date;
    
//     @Field(()=>Date)
//     updatedAt!:Date;

//     @Field(()=> [CloudinaryImage], {nullable:true})
//     cloudinaryImages?: CloudinaryImage[]
    
// }

// @InputType()
// export class UploadImageInput{
//     @Field(()=>String)
//     filename!: string;
//     @Field(()=> String)
//     mimetype!:string;
//     @Field(()=> Int)
//     encoding!: number;
//     @Field(()=> String)
//     base64!: string;
// }




