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
    prismaProduct: PrismaProduct & {
      creator: PrismaSeller;
      affiliates: PrismaSeller[];
    },
  ): Product {
    const product = new Product({
      id: prismaProduct.id,
      name: prismaProduct.name,
      price: prismaProduct.price,
      creator: new Seller({
        id: prismaProduct.creator.id,
        balance: prismaProduct.creator.balance,
        name: prismaProduct.creator.name,
      }),
    });

    prismaProduct.affiliates.forEach((affiliate) => {
      product.addAffiliate(
        new Seller({
          id: affiliate.id,
          balance: affiliate.balance,
          name: affiliate.name,
        }),
      );
    });

    return product;
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
        affiliates: true,
      },
    });

    return products.map(ProductsRepositoryPrisma.toDomain);
  }
  async getAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        creator: true,
        affiliates: true,
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
        affiliates: true,
      },
    });

    return product ? ProductsRepositoryPrisma.toDomain(product) : undefined;
  }
}
