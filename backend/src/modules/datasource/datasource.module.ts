import { Module } from '@nestjs/common';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';

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
  ],
  exports: ['TRANSACTIONS_REPOSITORY', 'SELLERS_REPOSITORY'],
})
export class DatasourceModule {}
