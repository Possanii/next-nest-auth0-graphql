import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { CoursesService } from '@/services/courses.service';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }
}
