import Header from '@/components/common/Header'
import ItemSection from '@/components/common/ItemSection'
import { Money } from '@/domain/Money'
import { useSeller } from '@/hooks/useSeller'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const SellerPage: NextPage = () => {
  const router = useRouter()
  const apiGateway = ApiGatewayFactory.make()
  const { isLoading, seller } = useSeller(router.query.id as string, apiGateway)
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      {isLoading && <p>Carregando...</p>}
      <ItemSection title='Informações do Vendedor'>
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
      </ItemSection>
    </main>
  )
}

export default SellerPage