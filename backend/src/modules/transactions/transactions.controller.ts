import {
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileToTransactionsPipe } from './fileToTransactions.pipe';
import { TransactionsService } from './transactions.service';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseInterceptors(FileInterceptor('sales', { storage: memoryStorage() }))
  @HttpCode(204)
  @Post('process')
  async processTransactions(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({
            fileType: 'text/plain',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileToTransactionsPipe = new FileToTransactionsPipe();
    const inputs = fileToTransactionsPipe.transform(file);
    await this.transactionsService.processTransactions(inputs);
  }
}
