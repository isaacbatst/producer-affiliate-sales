import { Module } from '@nestjs/common';
import { IdGeneratorCrypto } from '../../infra/common/IdGenerator/IdGeneratorCrypto';
import { DatasourceModule } from '../datasource/datasource.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Constants } from 'src/common/constants';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: Constants.ID_GENERATOR,
      useClass: IdGeneratorCrypto,
    },
  ],
  imports: [DatasourceModule],
})
export class TransactionsModule {}
