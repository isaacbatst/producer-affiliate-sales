type UserParams = {
  id: string;
  name: string;
  balance: number;
};

export class User {
  private readonly id: string;
  private readonly name: string;
  private balance: number;

  constructor(params: UserParams) {
    this.id = params.id;
    this.name = params.name;
    this.balance = params.balance;
  }

  public creditBalance(value: number): void {
    this.balance += value;
  }

  public debitBalance(value: number): void {
    this.balance -= value;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getBalance(): number {
    return this.balance;
  }
}
