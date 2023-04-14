import { Inject, Injectable } from '@nestjs/common';
import { SellersRepository } from './sellers.repository';
import { Seller } from 'src/domain/Seller/Seller';
import { SellerDto } from './sellers.dto';

@Injectable()
export class SellersService {
  static toDto(transaction: Seller): SellerDto {
    return {
      id: transaction.getId(),
      name: transaction.getName(),
      balance: transaction.getBalance(),
    };
  }

  constructor(
    @Inject('SELLERS_REPOSITORY')
    private readonly sellersRepository: SellersRepository,
  ) {}

  async getAll(): Promise<SellerDto[]> {
    const sellers = await this.sellersRepository.getAll();
    return sellers.map(SellersService.toDto);
  }
}
