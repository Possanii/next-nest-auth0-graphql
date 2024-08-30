import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerById(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }
}
