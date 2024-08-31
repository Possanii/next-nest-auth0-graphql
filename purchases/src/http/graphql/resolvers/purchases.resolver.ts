import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { CurrentUser, IAuthUser } from '@/auth/current-user';
import { CustomersService } from '@/services/customers.service';
import { ProductsService } from '@/services/products.service';
import { PurchasesService } from '@/services/purchases.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @Query(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async getPurchaseById(
    @Args('id') id: string,
    @CurrentUser() user: IAuthUser,
  ) {
    const customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      throw new BadRequestException('Customer not found.');
    }

    return this.purchasesService.getPurchaseById({
      purchaseId: id,
      customerId: customer.id,
    });
  }

  @Query(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async getPurchaseByCustomerId(@CurrentUser() user: IAuthUser) {
    const customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      throw new BadRequestException('Customer not found.');
    }

    return this.purchasesService.getPurchaseByCustomerId(customer.id);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') { productId }: CreatePurchaseInput,
    @CurrentUser() user: IAuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId,
    });
  }

  @ResolveField(() => Product)
  async product(@Root() purchase: Purchase) {
    return await this.productsService.getProductById(purchase.productId);
  }

  @ResolveField(() => Customer)
  async customer(@Root() purchase: Purchase) {
    return await this.customersService.getCustomerById(purchase.customerId);
  }
}
