export interface FileReader {
  toBuffer(filePath: string): Promise<Buffer>;
}
