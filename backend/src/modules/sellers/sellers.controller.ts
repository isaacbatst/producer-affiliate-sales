import { Controller, Get, Param } from '@nestjs/common';
import { SellersService } from './sellers.service';
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get()
  async getAll() {
    const sellers = await this.sellersService.getAll();
    return sellers;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const seller = await this.sellersService.getById(id);
    return seller;
  }
}
