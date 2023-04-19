export interface TokenGenerator {
  generate(): Promise<string>;
}
