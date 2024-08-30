import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { ProductsService } from '@/services/products.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query(() => [Product])
  @UseGuards(AuthorizationGuard)
  products() {
    return this.productService.listAllProducts();
  }

  @Mutation(() => Product)
  createProduct(@Args('data') { title }: CreateProductInput) {
    return this.productService.createProduct({ title });
  }
}
