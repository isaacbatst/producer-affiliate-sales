import { ValidationError } from '@/domain/Errors/ValidationError'
import { ApiGateway } from '@/infra/gateways/ApiGateway'
import React, { FormEvent, useRef, useState } from 'react'
import { useSWRConfig } from "swr"
import Alert from '../common/Alert'
import { SalesFormErrorHandler } from './SalesFormErrorHandler'

const salesInputId = 'sales-input'

type Props = {
  apiGateway: ApiGateway
}

const SalesForm: React.FC<Props> = ({ apiGateway }: Props) => {
  const [successfullyProcessed, setSuccessfullyProcessed] = useState(false);
  const { mutate } = useSWRConfig();
  const input = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setError(null)
      setIsLoading(true)
      setSuccessfullyProcessed(false)
      if(!input.current || !input.current.files || input.current.files.length === 0) {
        throw new ValidationError('Nenhum arquivo selecionado')
      }
      await apiGateway.processTransactions(input.current.files[0])
      input.current.value = ""
      await mutate('transactions')
      setSuccessfullyProcessed(true)
    } catch (err) {
      const readableError = SalesFormErrorHandler.toReadable(err)
      console.log('red', readableError)
      setError(readableError)
    } finally {
      setIsLoading(false)
    }
  }

  const onFileChange = () => {
    setError(null)
    setSuccessfullyProcessed(false)
  }

  return (
    <div className='flex flex-col justify-center items-center py-10 bg-white px-5 md:px-0'>
      <form onSubmit={onSubmit} role='form' className='flex flex-col items-center mb-4'>
        <div className="flex flex-col items-center mb-4">
          <label htmlFor={salesInputId} className='text-center mb-8 text-xl md:text-5xl font-semibold'>
            Registre suas vendas aqui
          </label>
          <input onChange={onFileChange} type='file' name='sales' id={salesInputId} 
            accept='.txt' className='mb-4 text-sm' ref={input} 
          />
        </div>
        <button 
          type='submit'  
          className='bg-theme-yellow-500 border border-slate-900 py-3 w-full font-semibold   
            rounded-lg hover:scale-105 transition-all active:opacity-70 mb-4 text-xl'
          disabled={isLoading}
        >
          {isLoading ? '...' : 'Enviar'}
        </button>
        {successfullyProcessed && (
          <Alert message='Vendas processadas com sucesso' type='success' />
        )}
        {
          error && (
            <Alert message={error} type='error' />
          )
        }
      </form>
    </div>
  )
}

export default SalesForm