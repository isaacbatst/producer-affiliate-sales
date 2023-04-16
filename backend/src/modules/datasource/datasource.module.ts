import { Module } from '@nestjs/common';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';

@Module({
  providers: [
    {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: new TransactionsRepositoryMemory(),
    },
    {
      provide: 'SELLERS_REPOSITORY',
      useValue: new SellersRepositoryMemory(),
    },
    {
      provide: 'PRODUCTS_REPOSITORY',
      useValue: new ProductsRepositoryMemory(),
    },
  ],
  exports: [
    'TRANSACTIONS_REPOSITORY',
    'SELLERS_REPOSITORY',
    'PRODUCTS_REPOSITORY',
  ],
})
export class DatasourceModule {}
