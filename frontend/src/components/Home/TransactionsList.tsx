import { useTransactions } from '@/hooks/useTransactions'
import { ApiGateway } from '@/infra/gateways/ApiGateway'
import React from 'react'

type Props = {
  apiGateway: ApiGateway
}

const TransactionsList = ({apiGateway}: Props) => {
  const {isLoading, transactions} = useTransactions(apiGateway)
  return (
    <section aria-label='Transações' className='bg-slate-100 py-10 flex flex-col items-center'>
      <h2 className='text-2xl'>Transações</h2>
      {isLoading && <p>Carregando...</p>}
      {transactions?.map(transaction => (
        <div key={transaction.id}>
          <p>{transaction.id}</p>
          <p>{transaction.sellerName}</p>
          <p>{transaction.value}</p>
          <p>{transaction.product}</p>
          <p>{transaction.date}</p>
        </div>
      ))}
      {!isLoading && transactions?.length === 0 && <p>Nenhuma transação encontrada</p>}
    </section>
  )
}

export default TransactionsList