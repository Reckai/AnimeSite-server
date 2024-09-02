import { InputType, Field, registerEnumType } from "type-graphql";

enum SortField {
  POPULARITY = "popularity",
  CREATED_AT = "createdAt",
}

enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

registerEnumType(SortField, { name: "SortField" });
registerEnumType(SortDirection, { name: "SortDirection" });

@InputType()
export class SortOrder {
  @Field(() => SortField)
  field!: SortField;

  @Field(() => SortDirection)
  direction!: SortDirection;
}