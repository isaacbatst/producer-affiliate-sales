import { Test, TestingModule } from '@nestjs/testing';
import { Seller } from '../../domain/Seller/Seller';
import { SellersRepositoryMemory } from './sellers.repository.memory';
import { SellersService } from './sellers.service';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';
import { Constants } from 'src/common/constants';

describe('SellersService', () => {
  let service: SellersService;
  const sellersRepository = new SellersRepositoryMemory();
  const productsRepository = new ProductsRepositoryMemory();
  const transactionsRepository = new TransactionsRepositoryMemory(
    productsRepository,
    sellersRepository,
  );
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellersService,
        {
          provide: Constants.SELLERS_REPOSITORY,
          useValue: sellersRepository,
        },
        {
          provide: Constants.TRANSACTIONS_REPOSITORY,
          useValue: transactionsRepository,
        },
      ],
    }).compile();

    service = module.get<SellersService>(SellersService);
    sellersRepository.sellers = [
      new Seller({ id: 'id-1', name: 'name-1', balance: 1000 }),
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all sellers', async () => {
    const transactions = await service.getAll();
    expect(transactions).toHaveLength(1);
  });

  it('should return seller', async () => {
    const seller = await service.getById('id-1');
    expect(seller).toBeDefined();
  });
});
