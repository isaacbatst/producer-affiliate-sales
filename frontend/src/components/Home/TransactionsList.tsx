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
    <section aria-label='Transações' className='bg-slate-900 py-10 flex-1'>
      <div className="container flex flex-col items-center mx-auto text-white px-5 md:px-0">
        <h2 className='text-xl lg:text-4xl mb-10 font-bold' id='transactions-list-title'>Lista de Transações</h2>
        {isLoading && <p role='status'>Carregando...</p>}
        {transactions && <ul className='grid grid-cols-1 md:grid-cols-3 gap-4' aria-labelledby='transactions-list-title'>
          {transactions?.map(transaction => <Transaction transaction={transaction} key={transaction.id} />)}
        </ul>}
        {(!isLoading && !transactions) || transactions?.length === 0 && (
          <p className='text-white font-light'>Nenhuma transação encontrada</p>
        )}
      </div>
    </section>
  )
}

export default TransactionsList