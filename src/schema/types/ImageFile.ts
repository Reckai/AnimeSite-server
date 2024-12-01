import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class ImagePreview {
  @Field()
  width: number;

  @Field()
  height: number;

  @Field()
  url: string;
}

@ObjectType()
export class ImageFile {
  @Field()
  id: string;

  @Field()
  blurhash: string;

  @Field(() => ImagePreview)
  preview: ImagePreview;
}
