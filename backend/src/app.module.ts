import { Module, ValidationPipe } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TransactionsModule, SellersModule, ProductsModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
