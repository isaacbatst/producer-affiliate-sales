import { Test, TestingModule } from '@nestjs/testing';
import { Seller } from '../../domain/Seller/Seller';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { SellersController } from './sellers.controller';
import { SellersRepositoryMemory } from './sellers.repository.memory';
import { SellersService } from './sellers.service';

describe('SellersController', () => {
  let controller: SellersController;
  const sellersRepository = new SellersRepositoryMemory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellersController],
      providers: [
        SellersService,
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

    controller = module.get<SellersController>(SellersController);
    sellersRepository.sellers = [
      new Seller({ id: 'id-1', name: 'name-1', balance: 1000 }),
    ];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all sellers', async () => {
    const sellers = await controller.getAll();
    expect(sellers).toHaveLength(1);
  });
});
