import { Module } from '@nestjs/common';
import { DatasourceModule } from '../datasource/datasource.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'ID_GENERATOR',
      useValue: new IdGeneratorFake(),
    },
  ],
  imports: [DatasourceModule],
})
export class TransactionsModule {}
