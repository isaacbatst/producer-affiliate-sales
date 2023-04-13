import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Module({
  providers: [
    TransactionsService,
    { provide: 'TRANSACTIONS_REPOSITORY',  }
  ],
})
export class TransactionsModule {}
