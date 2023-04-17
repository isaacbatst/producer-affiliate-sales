import { Module } from '@nestjs/common';
import { ProductsRepositoryPrisma } from '../../infra/repositories/ProductsRepository/ProductsRepositoryPrisma';
import { SellerRepositoryPrisma } from '../../infra/repositories/SellerRepository/SellerRepositoryPrisma';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsRepositoryPrisma } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryPrisma';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'PRISMA_SERVICE',
      useClass: PrismaService,
    },
    {
      provide: 'TRANSACTIONS_REPOSITORY',
      useClass: TransactionsRepositoryPrisma,
    },
    {
      provide: 'SELLERS_REPOSITORY',
      useClass: SellerRepositoryPrisma,
    },
    {
      provide: 'PRODUCTS_REPOSITORY',
      useClass: ProductsRepositoryPrisma,
    },
  ],
  exports: [
    'TRANSACTIONS_REPOSITORY',
    'SELLERS_REPOSITORY',
    'PRODUCTS_REPOSITORY',
  ],
})
export class DatasourceModule {}
