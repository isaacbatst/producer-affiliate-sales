import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { getTransactionsMock } from './transactions.mock';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';

describe('TransactionsService', () => {
  let service: TransactionsService;
  const transactionsRepository = new TransactionsRepositoryMemory();
  const sellersRepository = new SellersRepositoryMemory();
  const productsRepository = new ProductsRepositoryMemory();
  const idGenerator = new IdGeneratorFake();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          useValue: productsRepository,
        },
        {
          provide: 'ID_GENERATOR',
          useValue: idGenerator,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    sellersRepository.sellers = [];
    transactionsRepository.transactions = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process transactions', async () => {
    await service.processTransactions(getTransactionsMock());

    expect(transactionsRepository.transactions).toHaveLength(20);
    expect(sellersRepository.sellers).toHaveLength(7);
  });

  it('should update sellers balance', async () => {
    await service.processTransactions(getTransactionsMock());
    const seller = sellersRepository.sellers.find(
      (seller) => seller.getName() === 'JOSE CARLOS',
    );

    expect(seller).toBeDefined();
    expect(seller?.getBalance()).toBe(21000);
  });

  it('should return all transactions', async () => {
    await service.processTransactions(getTransactionsMock());
    const transactions = await service.getAll();
    expect(transactions).toHaveLength(20);
  });
});
