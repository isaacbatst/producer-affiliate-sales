import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Seller } from 'src/domain/Seller/Seller';
import { TransactionDto } from '../transactions/transactions.dto';
import { TransactionsMapper } from '../transactions/transactions.mapper';
import { TransactionsRepository } from '../transactions/transactions.repository';
import { SellerDto } from './sellers.dto';
import { SellersRepository } from './sellers.repository';

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
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async getAll(): Promise<SellerDto[]> {
    const sellers = await this.sellersRepository.getAll();
    return sellers.map(SellersService.toDto);
  }

  async getById(id: string): Promise<SellerDto> {
    const seller = await this.sellersRepository.getById(id);

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return SellersService.toDto(seller);
  }

  async getSellerTransactions(id: string): Promise<TransactionDto[]> {
    const transactions = await this.transactionsRepository.getBySeller(id);
    return transactions.map(TransactionsMapper.toDto);
  }
}
