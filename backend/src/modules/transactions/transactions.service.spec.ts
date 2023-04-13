import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { TransactionsRepositoryMemory } from './transactions.repository.memory';
import { SellersRepositoryMemory } from '../sellers/sellers.repository.memory';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';

describe('TransactionsService', () => {
  let service: TransactionsService;
  const transactionsRepository = new TransactionsRepositoryMemory();
  const sellersRepository = new SellersRepositoryMemory();

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
          provide: 'ID_GENERATOR',
          useValue: new IdGeneratorFake(),
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process transactions', async () => {
    const transactions = [
      {
        type: 1,
        date: new Date('2022-01-15T19:20:30-03:00'),
        product: 'CURSO DE BEM-ESTAR',
        value: 127.5,
        sellerName: 'JOSE CARLOS',
      },
      {
        type: 1,
        date: new Date('2021-12-03T11:46:02-03:00'),
        product: 'DOMINANDO INVESTIMENTOS',
        value: 500,
        sellerName: 'MARIA CANDIDA',
      },
    ];

    await service.processTransactions(transactions);

    expect(transactionsRepository.transactions).toHaveLength(2);
    expect(sellersRepository.sellers).toHaveLength(2);
  });
});
