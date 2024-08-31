import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  createStudent(authUserId: string) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
