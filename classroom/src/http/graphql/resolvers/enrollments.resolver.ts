import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { CoursesService } from '@/services/courses.service';
import { EnrollmentsService } from '@/services/enrollments.service';
import { StudentsService } from '@/services/students.service';
import { UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.findAllEnrollments();
  }

  @ResolveField(() => Student)
  student(@Root() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField(() => Course)
  course(@Root() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
