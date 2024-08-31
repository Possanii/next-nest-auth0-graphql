import { PrismaService } from '@/database/prisma/prisma.service';
import { UtilsService } from '@/utils/utils.service';
import { BadRequestException, Injectable } from '@nestjs/common';

interface ICreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private utils: UtilsService,
  ) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: ICreateCourseParams) {
    const slug = this.utils.createSlug(title);

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseWithSameSlug) {
      throw new BadRequestException('Course with same slug already exists.');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
