import { AuthorizationGuard } from '@/auth/authorization/authorization.guard';
import { CurrentUser, IAuthUser } from '@/auth/current-user';
import { CustomersService } from '@/services/customers.service';
import { PurchasesService } from '@/services/purchases.service';
import { UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Customer } from '../models/customer';
import { Purchase } from '../models/purchase';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private CustomerService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: IAuthUser) {
    return this.CustomerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => Purchase)
  async purchases(@Root() customer: Customer) {
    return this.purchasesService.getPurchaseByCustomerId(customer.id);
  }
}
