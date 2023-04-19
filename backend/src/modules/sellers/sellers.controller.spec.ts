import { Test, TestingModule } from '@nestjs/testing';
import { Seller } from '../../domain/Seller/Seller';
import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { SellersController } from './sellers.controller';
import { SellersRepositoryMemory } from './sellers.repository.memory';
import { SellersService } from './sellers.service';
import { TransactionsRepositoryMemory } from '../../infra/repositories/TransactionsRepository/TransactionsRepositoryMemory';
import { ProductsRepositoryMemory } from '../products/products.repository.memory';
import { Constants } from 'src/common/constants';

describe('SellersController', () => {
  let controller: SellersController;
  const sellersRepository = new SellersRepositoryMemory();
  const productsRepository = new ProductsRepositoryMemory();
  const transactionsRepository = new TransactionsRepositoryMemory(
    productsRepository,
    sellersRepository,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellersController],
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
        {
          provide: Constants.ID_GENERATOR,
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

  it('should return a seller', async () => {
    const seller = await controller.getById('id-1');
    expect(seller).toEqual({
      id: 'id-1',
      name: 'name-1',
      balance: 1000,
    });
  });
});
