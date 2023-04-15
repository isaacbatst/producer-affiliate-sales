import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} flex flex-col min-h-screen`}>
      <header className='py-3 px-5'>
        <h1 className='text-2xl font-bold'>Criadores e Afiliados</h1>
      </header>
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
    </main>
  )
}
