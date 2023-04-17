import { Module } from '@nestjs/common';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';

const productsRepository = new ProductsRepositoryMemory();
const sellersRepository = new SellersRepositoryMemory();

@Module({
  providers: [
    {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: new TransactionsRepositoryMemory(
        productsRepository,
        sellersRepository,
      ),
    },
    {
      provide: 'SELLERS_REPOSITORY',
      useValue: sellersRepository,
    },
    {
      provide: 'PRODUCTS_REPOSITORY',
      useValue: productsRepository,
    },
  ],
  exports: [
    'TRANSACTIONS_REPOSITORY',
    'SELLERS_REPOSITORY',
    'PRODUCTS_REPOSITORY',
  ],
})
export class DatasourceModule {}
