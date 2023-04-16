import { Test, TestingModule } from '@nestjs/testing';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { getSalesFileMock } from './transactions.mock';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';

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
          provide: 'PRODUCTS_REPOSITORY',
          useValue: new ProductsRepositoryMemory(),
        },
        {
          provide: 'ID_GENERATOR',
          useValue: new IdGeneratorFake(),
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    transactionsRepository.transactions = [];
    sellersRepository.sellers = [];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process transactions', async () => {
    const file = await getSalesFileMock();
    await controller.processTransactions(file);
    expect(transactionsRepository.transactions).toHaveLength(20);
  });

  it('should return all transactions', async () => {
    const file = await getSalesFileMock();
    await controller.processTransactions(file);
    const transactions = await controller.getAll();
    expect(transactions).toHaveLength(20);
  });
});
