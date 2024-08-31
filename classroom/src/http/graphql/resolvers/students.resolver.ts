import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { EnrollmentsService } from '@/services/enrollments.service';
import { StudentsService } from '@/services/students.service';
import { UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField(() => Enrollment)
  enrollments(@Root() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudentId(student.id);
  }
}
