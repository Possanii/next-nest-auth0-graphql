import { PrismaService } from '@/database/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

interface ICreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerById(id: string) {
    const customer = this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found.');
    }

    return customer;
  }

  getCustomerByAuthUserId(authUserId: string) {
    const customer = this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found.');
    }

    return customer;
  }

  async createCustomer({ authUserId }: ICreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
