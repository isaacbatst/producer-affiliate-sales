import { ApiGateway } from '@/infra/gateways/ApiGateway'
import React, { FormEvent, useRef, useState } from 'react'
import { useSWRConfig } from "swr"

const salesInputId = 'sales-input'

type Props = {
  apiGateway: ApiGateway
}

const SalesForm: React.FC<Props> = ({ apiGateway }: Props) => {
  const [successfullyProcessed, setSuccessfullyProcessed] = useState(false);
  const { mutate } = useSWRConfig();
  const input = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setSuccessfullyProcessed(false)
      if(!input.current || !input.current.files || input.current.files.length === 0) {
        return
      }
      await apiGateway.processTransactions(input.current.files[0])
      await mutate('transactions')
      setSuccessfullyProcessed(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center py-10 bg-white px-5 md:px-0'>
      <form onSubmit={onSubmit} role='form' className='flex flex-col items-center mb-4'>
        <div className="flex flex-col items-center mb-4">
          <label htmlFor={salesInputId} className='text-center mb-8 text-xl md:text-5xl font-semibold'>
            Registre suas vendas aqui
          </label>
          <input type='file' name='sales' id={salesInputId} accept='.txt' className='mb-4 text-sm' ref={input} />
        </div>
        <button 
          type='submit'  
          className='bg-theme-yellow-500 border border-slate-900 py-3 w-full font-semibold   
            rounded-lg hover:bg-theme-yellow-600 transition-colors mb-4 text-xl'>
          Enviar
        </button>
        {successfullyProcessed && (
          <div role='alert' aria-label='Sucesso'
            className='p-3 rounded-lg bg-green-500 text-white text-center w-full font-light'
          >Vendas processadas com sucesso</div>
        )}
      </form>
    </div>
  )
}

export default SalesForm