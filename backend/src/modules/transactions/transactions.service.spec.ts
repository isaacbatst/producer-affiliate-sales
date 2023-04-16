import { Test, TestingModule } from '@nestjs/testing';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { getTransactionsMock } from './transactions.mock';
import { TransactionsService } from './transactions.service';

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
  });

  it('should return all transactions', async () => {
    await service.processTransactions(getTransactionsMock());
    const transactions = await service.getAll();
    expect(transactions).toHaveLength(20);
  });

  it('should create products', async () => {
    await service.processTransactions(getTransactionsMock());
    const productIds = transactionsRepository.transactions.map((transaction) =>
      transaction.getProduct().getId(),
    );
    const uniqueIds = [...new Set(productIds)];

    expect(uniqueIds).toHaveLength(3);
  });

  it('should create sellers', async () => {
    await service.processTransactions(getTransactionsMock());
    const sellerIds = transactionsRepository.transactions.map((transaction) =>
      transaction.getSeller().getId(),
    );
    const uniqueIds = [...new Set(sellerIds)];
    expect(uniqueIds).toHaveLength(7);
  });
});
