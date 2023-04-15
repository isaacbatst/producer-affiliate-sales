import { useTransactions } from '@/hooks/useTransactions'
import { ApiGateway } from '@/infra/gateways/ApiGateway'
import React from 'react'
import Transaction from './Transaction'

type Props = {
  apiGateway: ApiGateway
}

const TransactionsList = ({apiGateway}: Props) => {
  const {isLoading, transactions} = useTransactions(apiGateway)
  return (
    <section aria-label='Transações' className='bg-slate-900 py-10'>
      <div className="container flex flex-col items-center mx-auto">
        <h2 className='text-4xl mb-10 text-white font-bold'>Transações</h2>
        {isLoading && <p role='status'>Carregando...</p>}
        {transactions && <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {transactions?.map(transaction => <Transaction transaction={transaction} key={transaction.id} />)}
        </div>}
        {!isLoading && transactions?.length === 0 && <p>Nenhuma transação encontrada</p>}
      </div>
    </section>
  )
}

export default TransactionsList