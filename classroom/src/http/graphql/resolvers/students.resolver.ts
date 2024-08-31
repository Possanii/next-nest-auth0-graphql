import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { CurrentUser, IAuthUser } from '@/auth/current-user';
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

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: IAuthUser) {
    let student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) {
      student = await this.studentsService.createStudent(user.sub);
    }

    return student;
  }

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
