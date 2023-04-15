import { Test, TestingModule } from '@nestjs/testing';
import { Seller } from '../../domain/Seller/Seller';
import { SellersRepositoryMemory } from './sellers.repository.memory';
import { SellersService } from './sellers.service';

describe('SellersService', () => {
  let service: SellersService;
  const sellersRepository = new SellersRepositoryMemory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellersService,
        {
          provide: 'SELLERS_REPOSITORY',
          useValue: sellersRepository,
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
