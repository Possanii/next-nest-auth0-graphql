import { DatabaseModule } from '@/database/database.module';
import { CoursesService } from '@/services/courses.service';
import { EnrollmentsService } from '@/services/enrollments.service';
import { StudentsService } from '@/services/students.service';
import { UtilsService } from '@/utils/utils.service';
import { Module } from '@nestjs/common';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [
    UtilsService,
    StudentsService,
    CoursesService,
    EnrollmentsService,
  ],
})
export class MessagingModule {}
