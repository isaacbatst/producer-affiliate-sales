import { Module } from '@nestjs/common';
import { IdGeneratorCrypto } from '../../infra/common/IdGenerator/IdGeneratorCrypto';
import { DatasourceModule } from '../datasource/datasource.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'ID_GENERATOR',
      useValue: new IdGeneratorCrypto(),
    },
  ],
  imports: [DatasourceModule],
})
export class TransactionsModule {}
