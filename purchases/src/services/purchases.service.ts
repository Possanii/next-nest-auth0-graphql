import { PrismaService } from '@/database/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

interface ICreatePurchaseParams {
  customerId: string;
  productId: string;
}

interface IGetPurchaseByIdParams {
  purchaseId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async getPurchaseById({ purchaseId, customerId }: IGetPurchaseByIdParams) {
    return await this.prisma.purchase.findUnique({
      where: {
        id: purchaseId,
        customerId,
      },
    });
  }

  async getPurchaseByCustomerId(customerId: string) {
    return await this.prisma.purchase.findMany({
      where: {
        customerId,
      },
    });
  }

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

    return await this.prisma.purchase.create({
      data: {
        productId,
        customerId,
      },
    });
  }
}
