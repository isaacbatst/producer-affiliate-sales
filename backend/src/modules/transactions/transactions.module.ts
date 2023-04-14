import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsRepositoryMemory } from './transactions.repository.memory';
import { IdGeneratorFake } from 'src/infra/common/IdGenerator/IdGeneratorFake';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: new TransactionsRepositoryMemory(),
    },
    {
      provide: 'SELLERS_REPOSITORY',
      useValue: new SellersRepositoryMemory(),
    },
    {
      provide: 'ID_GENERATOR',
      useValue: new IdGeneratorFake(),
    },
  ],
})
export class TransactionsModule {}
