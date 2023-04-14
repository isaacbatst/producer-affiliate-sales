import { Test, TestingModule } from '@nestjs/testing';
import { Constants } from '../../common/constants';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepositoryMemory } from './transactions.repository.memory';
import { TransactionsService } from './transactions.service';
import { FileReaderFs } from '../../infra/common/FileReader/FileReaderFs';
import { MulterFileFactory } from '../../infra/common/MulterFileFactory/MulterFileFactory';
import { join as joinPath } from 'path';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  const transactionsRepository = new TransactionsRepositoryMemory();
  const sellersRepository = new SellersRepositoryMemory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: 'TRANSACTIONS_REPOSITORY',
          useValue: transactionsRepository,
        },
        {
          provide: 'SELLERS_REPOSITORY',
          useValue: sellersRepository,
        },
        {
          provide: 'ID_GENERATOR',
          useValue: new IdGeneratorFake(),
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process transactions', async () => {
    const fileReader = new FileReaderFs();
    const buffer = await fileReader.toBuffer(
      joinPath(Constants.ROOT_DIR, 'sample', 'sales.txt'),
    );
    const file = await MulterFileFactory.create(buffer, {
      destination: joinPath(Constants.ROOT_DIR, 'samples'),
      fieldname: 'sales',
      filename: `sales-${Date.now()}.txt`,
      originalname: 'sales.txt',
      path: joinPath(Constants.ROOT_DIR, 'samples', 'sales.txt'),
    });

    await controller.processTransactions(file);

    expect(transactionsRepository.transactions).toHaveLength(20);
    expect(sellersRepository.sellers).toHaveLength(7);
  });
});
