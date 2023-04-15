import { Injectable, PipeTransform } from '@nestjs/common';
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
      .map<CreateTransactionDto>((line) => ({
        type: Number(line.slice(0, 1)),
        date: line.slice(1, 26),
        product: line.slice(26, 56).trim(),
        value: Number(line.slice(56, 66)),
        sellerName: line.slice(66, 86),
      }));
  }
}
