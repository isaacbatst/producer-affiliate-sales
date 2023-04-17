import TransactionsList from '@/components/Home/TransactionsList'
import Header from '@/components/common/Header'
import ItemSection from '@/components/common/ItemSection'
import { useProduct } from '@/hooks/useProduct'
import { useProductTransactions } from '@/hooks/useProductTransactions'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'
import { useRouter } from 'next/router'
import React from 'react'

const ProductPage = () => {
  const router = useRouter()
  const productId = router.query.id as string
  const apiGateway = ApiGatewayFactory.make()

  const { isLoading: isLoadingProduct, product } = useProduct(productId, apiGateway)
  const { isLoading: isLoadingTransactions, transactions} = useProductTransactions(productId, apiGateway)
  
  return (
    <main className={`min-h-screen flex flex-col`}>
      <Header />
      {isLoadingProduct && <p>Carregando...</p>}
      <ItemSection title='Informações do produto'>
        {product && (
          <>
            <p className='text-xl mb-10 border-b-4 lg:text-3xl font-bold'>
              {product.name}
            </p>
            <p className='text-xl mb-4'>Criador: 
              <br/><span className='text-xl lg:text-4xl font-bold'>{product.creator.name}</span>
            </p>
            <h2>Afiliados:</h2> 
            {product.affiliates.length ? (
              <ul>
                {
                  product.affiliates
                    .map(affiliate => (
                      <li
                        className='font-medium'
                        key={affiliate.id}>{affiliate.name}
                      </li>
                    ))
                }
              </ul>
            ): (
              <p className='font-light'>Nenhum afiliado encontrado</p>
            )}
          </>
        )}
        {!isLoadingProduct && !product && (
          <p className='text-sm lg:text-xl text-center font-light'>Producto não encontrado</p>
        )}
      </ItemSection>
      <TransactionsList isLoading={isLoadingTransactions} transactions={transactions} />
    </main>
  )
}

export default ProductPage