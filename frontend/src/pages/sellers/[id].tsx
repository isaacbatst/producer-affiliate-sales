import Header from '@/components/Header'
import { Money } from '@/domain/Money'
import { useSeller } from '@/hooks/useSeller'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

const SellerPage: NextPage = () => {
  const router = useRouter()
  const apiGateway = ApiGatewayFactory.make()
  const { isLoading, seller } = useSeller(router.query.id as string, apiGateway)
  return (
    <main className={`min-h-screen flex flex-col ${inter.className}`}>
      <Header />
      {isLoading && <p>Carregando...</p>}
      <section className='bg-theme-yellow-500 flex flex-1'>
        <div className="container py-10 px-5 md:px-0 mx-auto flex flex-col md:flex-row md:items-center flex-1 gap-10">
          <div className='lg:flex-1 justify-center flex'>
            <h1 className='text-xl lg:text-4xl font-semibold'>Informações do vendedor</h1>
          </div>
          <div className='lg:grow-[2] flex-1  text-white'>
            <div className='bg-slate-900 rounded-lg p-5 lg:p-14 shadow-lg shadow-black'>
              {seller && (
                <>
                  <p className='text-xl mb-10 border-b-4 lg:text-3xl font-bold'>
                    {seller.name}
                  </p>
                  <p className='text-xl'>Saldo: 
                    <br/><span className='text-xl lg:text-7xl font-bold'>{new Money(seller.balance).print()}</span>
                  </p>
                </>
              )}
              {!isLoading && !seller && (
                <p className='text-sm lg:text-xl text-center font-light'>Vendedor não encontrado</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SellerPage