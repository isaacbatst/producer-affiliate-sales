import { Injectable, PipeTransform } from '@nestjs/common';
import { ProcessTransactionsInput } from './transactions.service';

@Injectable()
export class FileToTransactionsPipe
  implements PipeTransform<Express.Multer.File, ProcessTransactionsInput[]>
{
  transform(file: Express.Multer.File): ProcessTransactionsInput[] {
    const text = file.buffer.toString('utf8');
    const lines = text.split('\n');
    return lines
      .filter((line) => line.length > 0)
      .map<ProcessTransactionsInput>((line) => ({
        type: Number(line.slice(0, 1)),
        date: new Date(line.slice(1, 26)),
        product: line.slice(26, 56).trim(),
        value: Number(line.slice(56, 66)),
        sellerName: line.slice(66, 86),
      }));
  }
}
