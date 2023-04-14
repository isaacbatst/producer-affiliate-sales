import { createReadStream } from 'node:fs';
import { FileReader } from './FileReader';

export class FileReaderFs implements FileReader {
  toBuffer(filePath: string): Promise<Buffer> {
    const readStream = createReadStream(filePath);
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      readStream.on('error', (err) => {
        reject(err);
      });

      readStream.on('data', (chunk) => {
        if (typeof chunk === 'string') {
          chunk = Buffer.from(chunk);
        }

        chunks.push(chunk);
      });

      readStream.on('close', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  }
}
