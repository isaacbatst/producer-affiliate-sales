import { Readable } from 'stream';

type MulterFileFactoryOptions = {
  destination: string;
  filename: string;
  fieldname: string;
  path: string;
  originalname?: string;
  encoding?: string;
};

export class MulterFileFactory {
  static async create(
    buffer: Buffer,
    options: MulterFileFactoryOptions,
  ): Promise<Express.Multer.File> {
    return {
      buffer,
      size: buffer.byteLength,
      destination: options.destination,
      mimetype: 'text/plain',
      stream: Readable.from(buffer),
      filename: options.filename,
      fieldname: options.fieldname,
      path: options.path,
      originalname: options.originalname ?? options.filename,
      encoding: options.encoding ?? 'utf8',
    };
  }
}
