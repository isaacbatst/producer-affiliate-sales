import { Module } from '@nestjs/common';
import { DatasourceModule } from '../datasource/datasource.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [DatasourceModule],
})
export class ProductsModule {}
