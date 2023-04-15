import { ApiGateway } from '@/infra/gateways/ApiGateway'
import React, { FormEvent, useState } from 'react'
import { useSWRConfig } from "swr"

const salesInputId = 'sales-input'

type Props = {
  apiGateway: ApiGateway
}

const SalesForm: React.FC<Props> = ({ apiGateway }: Props) => {
  const [successfullyProcessed, setSuccessfullyProcessed] = useState(false);
  const { mutate } = useSWRConfig()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setSuccessfullyProcessed(false)
      const input = document.getElementById(salesInputId) as HTMLInputElement
      if(!input.files || input.files.length === 0) {
        return
      }
      await apiGateway.processTransactions(input.files[0])
      await mutate('transactions')
      setSuccessfullyProcessed(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center py-10 bg-white'>
      <form onSubmit={onSubmit} role='form' className='flex flex-col items-center'>
        <div className="flex flex-col items-center mb-4">
          <label htmlFor={salesInputId} className='text-center mb-8 text-5xl font-semibold'>
            Registre suas vendas aqui
          </label>
          <input type='file' name='sales' id={salesInputId} accept='.txt' className='mb-4' />
        </div>
        <button 
          type='submit'  
          className='bg-theme-yellow-500 border border-slate-900 py-3 w-full font-semibold   
            rounded-lg hover:bg-theme-yellow-600 transition-colors'>
          Enviar
        </button>
      </form>
      {successfullyProcessed && (
        <div role='alert' aria-label='Sucesso'>Vendas processadas com sucesso</div>
      )}
    </div>
  )
}

export default SalesForm