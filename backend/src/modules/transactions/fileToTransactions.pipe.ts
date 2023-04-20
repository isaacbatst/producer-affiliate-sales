import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateTransactionDto } from './transactions.dto';

@Injectable()
export class FileToTransactionsPipe
  implements PipeTransform<Express.Multer.File, CreateTransactionDto[]>
{
  transform(file: Express.Multer.File): CreateTransactionDto[] {
    const text = file.buffer.toString('utf8');
    const lines = text.split('\n');
    return lines
      .filter((line) => line.length > 0)
      .map<CreateTransactionDto>((line, index) => {
        const type = Number(line.slice(0, 1));

        if (isNaN(type)) {
          throw new BadRequestException({
            error: 'INVALID_TRANSACTION_TYPE_NAN',
            line: index + 1,
          });
        }

        if (type < 1 || type > 4) {
          throw new BadRequestException({
            error: 'INVALID_TRANSACTION_TYPE_INTERVAL',
            line: index + 1,
          });
        }

        const date = line.slice(1, 26);

        if (isNaN(Date.parse(date))) {
          throw new BadRequestException({
            error: 'INVALID_TRANSACTION_DATE',
            line: index + 1,
          });
        }

        const product = line.slice(26, 56).trim();

        if (product.length === 0) {
          throw new BadRequestException({
            error: 'INVALID_TRANSACTION_PRODUCT',
            line: index + 1,
          });
        }

        const value = Number(line.slice(56, 66));

        if (isNaN(value)) {
          throw new BadRequestException({
            error: 'INVALID_TRANSACTION_VALUE',
            line: index + 1,
          });
        }

        const sellerName = line.slice(66, 86).trim();

        if (sellerName.length === 0) {
          throw new BadRequestException({
            error: 'INVALID_TRANSACTION_SELLER_NAME',
            line: index + 1,
          });
        }

        return {
          type,
          date,
          product,
          value,
          sellerName,
        };
      });
  }
}
