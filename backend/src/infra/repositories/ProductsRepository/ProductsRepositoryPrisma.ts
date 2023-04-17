import { Product } from '../../../domain/Product/Product';
import { ProductsRepository } from '../../../modules/products/products.repository';
import {
  Product as PrismaProduct,
  Seller as PrismaSeller,
} from '@prisma/client';
import { Seller } from '../../../domain/Seller/Seller';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { Inject } from '@nestjs/common';

export class ProductsRepositoryPrisma implements ProductsRepository {
  static toDomain(
    product: PrismaProduct & {
      creator: PrismaSeller;
    },
  ): Product {
    return new Product({
      id: product.id,
      name: product.name,
      price: product.price,
      creator: new Seller({
        id: product.creator.id,
        balance: product.creator.balance,
        name: product.creator.name,
      }),
    });
  }
  constructor(@Inject('PRISMA_SERVICE') private prisma: PrismaService) {}

  async getByNames(names: string[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          in: names,
        },
      },
      include: {
        creator: true,
      },
    });

    return products.map(ProductsRepositoryPrisma.toDomain);
  }
  async getAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        creator: true,
      },
    });

    return products.map(ProductsRepositoryPrisma.toDomain);
  }
  async getById(id: string): Promise<Product | undefined> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        creator: true,
      },
    });

    return product ? ProductsRepositoryPrisma.toDomain(product) : undefined;
  }
}
