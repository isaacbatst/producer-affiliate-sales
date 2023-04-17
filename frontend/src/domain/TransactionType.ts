export enum TransactionTypeEnum {
  CREATOR_SELL = 1,
  AFFILIATE_SELL = 2,
  COMMISSION_PAYMENT = 3,
  COMMISION_RECEIVEMENT = 4,
}

export class TransactionType {
  private static readonly printMap: Record<TransactionTypeEnum, string> = {
    [TransactionTypeEnum.CREATOR_SELL]: 'Venda criador',
    [TransactionTypeEnum.AFFILIATE_SELL]: 'Venda afiliado',
    [TransactionTypeEnum.COMMISSION_PAYMENT]: 'Pagamento de comissão',
    [TransactionTypeEnum.COMMISION_RECEIVEMENT]: 'Recebimento de comissão',
  }

  private static readonly signalMap: Record<TransactionTypeEnum, string> = {
    [TransactionTypeEnum.CREATOR_SELL]: '+',
    [TransactionTypeEnum.AFFILIATE_SELL]: '+',
    [TransactionTypeEnum.COMMISSION_PAYMENT]: '-',
    [TransactionTypeEnum.COMMISION_RECEIVEMENT]: '+',
  }

  readonly type: TransactionTypeEnum

  constructor(type: number) {
    if(!TransactionTypeEnum[type]) {
      throw new Error(`Invalid type ${type}`)
    }

    this.type = type
  }

  print() {
    return TransactionType.printMap[this.type]
  }

  signal() {
    return TransactionType.signalMap[this.type]
  }
}