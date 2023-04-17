import { Seller } from '../../../domain/Seller/Seller';
import { Seller as PrismaSeller } from '@prisma/client';
import { SellersRepository } from '../../../modules/sellers/sellers.repository';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { Inject } from '@nestjs/common';

export class SellerRepositoryPrisma implements SellersRepository {
  static toDomain(seller: PrismaSeller): Seller {
    return new Seller({
      id: seller.id,
      balance: seller.balance,
      name: seller.name,
    });
  }

  constructor(@Inject('PRISMA_SERVICE') private prisma: PrismaService) {}
  async getAll(): Promise<Seller[]> {
    const sellers = await this.prisma.seller.findMany();
    return sellers.map(SellerRepositoryPrisma.toDomain);
  }
  async getById(id: string): Promise<Seller | undefined> {
    const seller = await this.prisma.seller.findUnique({
      where: {
        id,
      },
    });
    return seller ? SellerRepositoryPrisma.toDomain(seller) : undefined;
  }
  async getByNames(names: string[]): Promise<Seller[]> {
    const sellers = await this.prisma.seller.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
    return sellers.map(SellerRepositoryPrisma.toDomain);
  }
  async updateMany(sellers: Seller[]): Promise<void> {
    await Promise.all(
      sellers.map((seller) =>
        this.prisma.seller.update({
          where: { id: seller.getId() },
          data: { balance: seller.getBalance() },
        }),
      ),
    );
  }
  async createMany(sellers: Seller[]): Promise<void> {
    await this.prisma.seller.createMany({
      data: sellers.map((seller) => ({
        id: seller.getId(),
        balance: seller.getBalance(),
        name: seller.getName(),
      })),
    });
  }
}
