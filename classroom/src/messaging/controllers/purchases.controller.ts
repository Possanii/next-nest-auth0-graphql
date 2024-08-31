import { CoursesService } from '@/services/courses.service';
import { EnrollmentsService } from '@/services/enrollments.service';
import { StudentsService } from '@/services/students.service';
import { Controller, InternalServerErrorException } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private coursesServices: CoursesService,
    private enrollmentsServices: EnrollmentsService,
  ) {}

  @EventPattern('purchase.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent(
        payload.customer.authUserId,
      );
    }

    let course = await this.coursesServices.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesServices.createCourse({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }

    try {
      await this.enrollmentsServices.createEnrollment({
        courseId: course.id,
        studentId: student.id,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // IGNORE ERROR
        console.log('This enrollment already exists.');
        return;
      }

      throw new InternalServerErrorException(
        'Could not create enrollment. Try again later.',
      );
    }
  }
}
