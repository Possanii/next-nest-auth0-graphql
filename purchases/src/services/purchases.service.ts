import { PrismaService } from '@/database/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

interface ICreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: ICreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const customer = await this.prisma.customer.findUnique({
      where: {
        authUserId: customerId,
      },
    });

    return await this.prisma.purchase.create({
      data: {
        productId,
        customerId: customer.id,
      },
    });
  }
}
