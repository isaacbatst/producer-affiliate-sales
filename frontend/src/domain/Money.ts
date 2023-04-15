export class Money {
  constructor(private amount: number) {}
  
  print(): string {
    const value = this.amount / 100;
    return `R$ ${value.toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: 2})}`;
  }
}