import { Money } from '@/domain/Money'
import { Transaction } from '@/domain/Transaction'
import Link from 'next/link'
import React from 'react'

type Props = {
  transaction: Transaction
}

const Transaction = ({transaction}: Props) => {
  const value = new Money(transaction.value);
  return (
    <li key={transaction.id} className='bg-white rounded-lg border 
      shadow-sm p-8 flex flex-col text-slate-900' aria-label={`Transação de ${transaction.seller.name}`}>
      <p className='text-sm mb-1'><strong className='text-base'>Vendedor:</strong>
        <Link href={`/sellers/${transaction.seller.id}`}
          className='bg-theme-yellow-500 hover:bg-theme-yellow-600 transition-colors 
        px-3 py-1 ml-1 text-slate-900 border border-slate-900 rounded-lg font-medium active:scale-105'
        >
          {transaction.seller.name} 
        </Link>
      </p>
      <p className='text-sm'><strong className='text-base'>Valor:</strong> {value.print()}</p>
      <p className='text-sm'><strong className='text-base'>Produto:</strong> {transaction.product}</p>
      <p className='text-sm'><strong className='text-base'>Tipo:</strong> {transaction.type}</p>
      <p className='text-sm'><strong className='text-base'>Data:</strong> {new Date(transaction.date).toLocaleString()}</p>
    </li>
  )
}

export default Transaction