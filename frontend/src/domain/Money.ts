export class Money {
  constructor(private amount: number) {}
  
  print(): string {
    const value = this.amount / 100;
    return `R$ ${value.toFixed(2)}`;
  }
}