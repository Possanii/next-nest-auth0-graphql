import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from './course';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Student)
  student: Student;

  studentId: string;

  @Field(() => Course)
  course: Course;

  courseId: string;
}
