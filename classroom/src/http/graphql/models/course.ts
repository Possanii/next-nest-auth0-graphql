import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field(() => Date)
  createdAt: Date;

  updatedAt: Date;

  @Field(() => [Enrollment])
  enrolledOn: Enrollment[];
}
