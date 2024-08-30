import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field(() => ID)
  productId: string;
}
