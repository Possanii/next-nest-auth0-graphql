import { PrismaService } from '@/database/prisma/prisma.service';
import { UtilsService } from '@/utils/utils.service';
import { BadRequestException, Injectable } from '@nestjs/common';

interface ICreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private utils: UtilsService,
  ) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct({ title }: ICreateProductParams) {
    const slug = this.utils.createSlug(title);

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new BadRequestException(
        'Another product with same slug already exists.',
      );
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
