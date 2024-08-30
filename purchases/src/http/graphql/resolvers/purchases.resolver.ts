import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { CurrentUser, IAuthUser } from '@/auth/current-user';
import { ProductsService } from '@/services/products.service';
import { PurchasesService } from '@/services/purchases.service';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  createPurchase(
    @Args('data') { productId }: CreatePurchaseInput,
    @CurrentUser() user: IAuthUser,
  ) {
    return this.purchasesService.createPurchase({
      customerId: user.sub,
      productId,
    });
  }
}
