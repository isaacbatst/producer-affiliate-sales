import { Module } from '@nestjs/common';
import { SellersRepositoryMemory } from './sellers.repository.memory';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  controllers: [SellersController],
  providers: [
    SellersService,
    {
      provide: 'SELLERS_REPOSITORY',
      useValue: new SellersRepositoryMemory(),
    },
  ],
})
export class TransactionsModule {}
