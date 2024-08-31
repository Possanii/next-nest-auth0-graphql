import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }
}
