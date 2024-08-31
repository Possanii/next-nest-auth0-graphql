import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  updatedAt: Date;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
