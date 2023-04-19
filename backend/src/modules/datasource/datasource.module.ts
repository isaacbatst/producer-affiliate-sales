import { Module } from '@nestjs/common';
import { ProductsRepositoryPrisma } from '../../infra/repositories/ProductsRepository/ProductsRepositoryPrisma';
import { SellerRepositoryPrisma } from '../../infra/repositories/SellerRepository/SellerRepositoryPrisma';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsRepositoryPrisma } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryPrisma';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepositoryPrisma } from 'src/infra/repositories/UsersRepository/UsersRepositoryPrisma';
import { Constants } from 'src/common/constants';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: Constants.PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: Constants.TRANSACTIONS_REPOSITORY,
      useClass: TransactionsRepositoryPrisma,
    },
    {
      provide: Constants.SELLERS_REPOSITORY,
      useClass: SellerRepositoryPrisma,
    },
    {
      provide: Constants.PRODUCTS_REPOSITORY,
      useClass: ProductsRepositoryPrisma,
    },
    {
      provide: Constants.USERS_REPOSITORY,
      useClass: UsersRepositoryPrisma,
    },
  ],
  exports: [
    Constants.TRANSACTIONS_REPOSITORY,
    Constants.SELLERS_REPOSITORY,
    Constants.PRODUCTS_REPOSITORY,
    Constants.USERS_REPOSITORY,
  ],
})
export class DatasourceModule {}
