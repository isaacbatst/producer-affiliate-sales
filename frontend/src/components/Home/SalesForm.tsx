import { ApiGateway } from '@/infra/gateways/ApiGateway'
import React, { FormEvent, useState } from 'react'

const salesInputId = 'sales-input'

type Props = {
  apiGateway: ApiGateway
}

const SalesForm: React.FC<Props> = ({ apiGateway }: Props) => {
  const [successfullyProcessed, setSuccessfullyProcessed] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setSuccessfullyProcessed(false)
      const input = document.getElementById(salesInputId) as HTMLInputElement
      if(!input.files || input.files.length === 0) {
        return
      }
      await apiGateway.processTransactions(input.files[0])
      setSuccessfullyProcessed(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center'>
      <form onSubmit={onSubmit} role='form' className='flex flex-col items-center'>
        <div className="flex flex-col">
          <label htmlFor={salesInputId} className='text-center'>Arquivo de Vendas</label>
          <input type='file' name='sales' id={salesInputId} accept='.txt' />
        </div>
        <button 
          type='submit'  
          className='bg-theme-yellow-500 py-3 w-full font-medium 
            rounded-sm hover:bg-theme-yellow-600 transition-colors'>
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