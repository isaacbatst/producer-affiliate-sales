import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll() {
    const products = await this.productsService.getAll();
    return products;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const product = await this.productsService.getById(id);
    return product;
  }

  @Get('/:id/transactions')
  async getProductTransactions(@Param('id') id: string) {
    const transactions = await this.productsService.getProductTransactions(id);
    return transactions;
  }
}
