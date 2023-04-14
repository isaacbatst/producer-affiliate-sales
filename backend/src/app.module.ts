import { Module } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { SellersModule } from './modules/sellers/sellers.module';

@Module({
  imports: [TransactionsModule, SellersModule],
})
export class AppModule {}
