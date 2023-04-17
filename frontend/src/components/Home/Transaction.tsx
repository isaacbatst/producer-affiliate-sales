import { Money } from '@/domain/Money'
import { TransactionDto } from '@/domain/TransactionDto'
import { TransactionType } from '@/domain/TransactionType'
import Link from 'next/link'
import React from 'react'

type Props = {
  transaction: TransactionDto
}

const Transaction = ({transaction}: Props) => {
  const value = new Money(transaction.value);
  const type = new TransactionType(transaction.type);
  return (
    <li key={transaction.id} className='bg-white rounded-lg border 
      shadow-sm p-8 flex flex-col text-slate-900' aria-label={`Transação de ${transaction.seller.name}`}>
      <p className='text-sm mb-1'><strong className='text-base'>Vendedor:</strong>
        <Link href={`/sellers/${transaction.seller.id}`}
          className='bg-theme-yellow-500 hover:bg-theme-yellow-600 transition-colors inline-block
        px-3 py-1 ml-1 text-slate-900 border border-slate-900 rounded-lg font-medium active:scale-105'
        >
          {transaction.seller.name} 
        </Link>
      </p>
      <p className='text-sm'><strong className='text-base'>Valor:</strong> {value.print()}</p>
      <p className='text-sm'><strong className='text-base'>Produto:</strong>
        <Link href={`/products/${transaction.product.id}`}
          className='bg-theme-yellow-500 hover:bg-theme-yellow-600 transition-colors inline-block
        px-3 py-1 ml-1 text-slate-900 border border-slate-900 rounded-lg font-medium active:scale-105'
        >
          {transaction.product.name} 
        </Link></p>
      <p className='text-sm'><strong className='text-base'>Tipo:</strong> {type.print()}</p>
      <p className='text-sm'><strong className='text-base'>Data:</strong> {new Date(transaction.date).toLocaleString()}</p>
    </li>
  )
}

export default Transaction