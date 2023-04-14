import { Module } from '@nestjs/common';
import { DatasourceModule } from '../datasource/datasource.module';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  controllers: [SellersController],
  providers: [SellersService],
  imports: [DatasourceModule],
})
export class SellersModule {}
