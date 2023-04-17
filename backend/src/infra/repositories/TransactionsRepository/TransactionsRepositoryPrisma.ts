import { Transaction } from '../../../domain/Transaction/Transaction';
import { TransactionsRepository } from '../../../modules/transactions/transactions.repository';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import {
  TransactionType as PrismaTransactionType,
  Transaction as PrismaTransaction,
  Product as PrismaProduct,
  Seller as PrismaSeller,
} from '@prisma/client';
import { TransactionType } from '../../../domain/Transaction/TransactionType';
import { TransactionFactory } from '../../../domain/Transaction/TransactionFactory';
import { Product } from '../../../domain/Product/Product';
import { Seller } from '../../../domain/Seller/Seller';
import { Inject } from '@nestjs/common';

export class TransactionsRepositoryPrisma implements TransactionsRepository {
  static mapType: Record<TransactionType, PrismaTransactionType> = {
    [TransactionType.CREATOR_SELL]: PrismaTransactionType.CREATOR_SELL,
    [TransactionType.AFFILIATE_SELL]: PrismaTransactionType.AFFILIATE_SELL,
    [TransactionType.COMMISION_RECEIVEMENT]:
      PrismaTransactionType.COMMISION_RECEIVEMENT,
    [TransactionType.COMMISSION_PAYMENT]:
      PrismaTransactionType.COMMISSION_PAYMENT,
  };

  static toDomain(
    transaction: PrismaTransaction & {
      product: PrismaProduct;
      seller: PrismaSeller;
    },
  ): Transaction {
    return TransactionFactory.create({
      id: transaction.id,
      date: transaction.date,
      value: transaction.value,
      type: TransactionType[transaction.type],
      product: new Product({
        id: transaction.product.id,
        name: transaction.product.name,
        price: transaction.product.price,
        creator: new Seller({
          id: transaction.seller.id,
          balance: transaction.seller.balance,
          name: transaction.seller.name,
        }),
      }),
      seller: new Seller({
        id: transaction.seller.id,
        balance: transaction.seller.balance,
        name: transaction.seller.name,
      }),
    });
  }

  constructor(@Inject('PRISMA_SERVICE') private prisma: PrismaService) {}
  async createMany(transactions: Transaction[]): Promise<void> {
    for (const transaction of transactions) {
      await this.prisma.transaction.create({
        data: {
          id: transaction.getId(),
          date: transaction.getDate(),
          value: transaction.getValue(),
          type: TransactionsRepositoryPrisma.mapType[transaction.getType()],
          product: {
            connectOrCreate: {
              where: {
                id: transaction.getProduct().getId(),
              },
              create: {
                id: transaction.getProduct().getId(),
                name: transaction.getProduct().getName(),
                price: transaction.getProduct().getPrice(),
                affiliates: {
                  connectOrCreate: transaction
                    .getProduct()
                    .getAffiliates()
                    .map((affiliate) => {
                      return {
                        where: {
                          id: affiliate.getId(),
                        },
                        create: {
                          id: affiliate.getId(),
                          balance: affiliate.getBalance(),
                          name: affiliate.getName(),
                        },
                      };
                    }),
                },
                creator: {
                  connectOrCreate: {
                    where: {
                      id: transaction.getProduct().getCreator().getId(),
                    },
                    create: {
                      id: transaction.getProduct().getCreator().getId(),
                      name: transaction.getProduct().getCreator().getName(),
                      balance: transaction
                        .getProduct()
                        .getCreator()
                        .getBalance(),
                    },
                  },
                },
              },
            },
          },
          seller: {
            connectOrCreate: {
              where: {
                id: transaction.getSeller().getId(),
              },
              create: {
                id: transaction.getSeller().getId(),
                balance: transaction.getSeller().getBalance(),
                name: transaction.getSeller().getName(),
              },
            },
          },
        },
      });
    }
  }
  async getAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        product: true,
        seller: true,
      },
    });
    return transactions.map(TransactionsRepositoryPrisma.toDomain);
  }
  async getByProduct(id: string): Promise<Transaction[]> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        product: {
          id,
        },
      },
      include: {
        product: true,
        seller: true,
      },
    });

    return transaction.map(TransactionsRepositoryPrisma.toDomain);
  }
  async getBySeller(id: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        seller: {
          id,
        },
      },
      include: {
        product: true,
        seller: true,
      },
    });

    return transactions.map(TransactionsRepositoryPrisma.toDomain);
  }
}
