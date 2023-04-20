import { Test, TestingModule } from '@nestjs/testing';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { getSalesFileMock } from './transactions.mock';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';
import { Constants } from 'src/common/constants';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  const productsRepository = new ProductsRepositoryMemory();
  const sellersRepository = new SellersRepositoryMemory();
  const transactionsRepository = new TransactionsRepositoryMemory(
    productsRepository,
    sellersRepository,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: Constants.TRANSACTIONS_REPOSITORY,
          useValue: transactionsRepository,
        },
        {
          provide: Constants.SELLERS_REPOSITORY,
          useValue: sellersRepository,
        },
        {
          provide: Constants.PRODUCTS_REPOSITORY,
          useValue: new ProductsRepositoryMemory(),
        },
        {
          provide: Constants.ID_GENERATOR,
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

  it('should process transactions twice', async () => {
    const file = await getSalesFileMock();
    await controller.processTransactions(file);
    await controller.processTransactions(file);
    expect(transactionsRepository.transactions).toHaveLength(40);
  });

  it('should return all transactions', async () => {
    const file = await getSalesFileMock();
    await controller.processTransactions(file);
    const transactions = await controller.getAll();
    expect(transactions).toHaveLength(20);
  });
});
