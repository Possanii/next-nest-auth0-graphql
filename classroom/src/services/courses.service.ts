import { PrismaService } from '@/database/prisma/prisma.service';
import { UtilsService } from '@/utils/utils.service';
import { BadRequestException, Injectable } from '@nestjs/common';

interface ICreateCourseParams {
  title: string;
  slug?: string;
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

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = this.utils.createSlug(title),
  }: ICreateCourseParams) {
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
