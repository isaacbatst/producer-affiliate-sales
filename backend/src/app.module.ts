import { Module } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [TransactionsModule, SellersModule, ProductsModule],
})
export class AppModule {}
