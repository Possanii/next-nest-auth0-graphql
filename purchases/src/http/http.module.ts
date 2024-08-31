import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { CustomersService } from '@/services/customers.service';
import { ProductsService } from '@/services/products.service';
import { PurchasesService } from '@/services/purchases.service';
import { UtilsService } from '@/utils/utils.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { CustomerResolver } from './graphql/resolvers/customers.resolver';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    //Services
    UtilsService,
    ProductsService,
    PurchasesService,
    CustomersService,

    //Resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomerResolver,
  ],
})
export class HttpModule {}
