import React from 'react'

type Props = {}

const SalesForm: React.FC = (props: Props) => {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <div className="flex flex-col items-center">
        <label>Arquivo de Vendas</label>
        <input type='file' name='sales' />
        <button 
        type='submit'  
        className='bg-theme-yellow-500 py-3 w-full font-medium 
        rounded-sm border border-slate-900
        hover:bg-theme-yellow-600 transition-colors'>
          Enviar
        </button>
      </div>
    </div>
  )
}

export default SalesForm