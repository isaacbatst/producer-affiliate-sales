import Header from '@/components/common/Header'
import ItemSection from '@/components/common/ItemSection'
import TransactionsList from '@/components/common/TransactionsList/TransactionsList'
import { Money } from '@/domain/Money'
import { useSeller } from '@/hooks/useSeller'
import { useSellerTransactions } from '@/hooks/useSellerTransactions'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'
import { redirectIfUnauthorized } from '@/infra/validateAuth'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

const apiGateway = ApiGatewayFactory.make()

const SellerPage: NextPage = () => {
  const router = useRouter()
  const sellerId = router.query.id as string
  const {isLoading: isLoadingTransactions, transactions} = useSellerTransactions(sellerId, apiGateway)
  const { isLoading: isLoadingSeller, seller } = useSeller(sellerId, apiGateway)
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      {isLoadingSeller && <p>Carregando...</p>}
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
        {!isLoadingSeller && !seller && (
          <p className='text-sm lg:text-xl text-center font-light'>Vendedor não encontrado</p>
        )}
      </ItemSection>
      <TransactionsList isLoading={isLoadingTransactions} transactions={transactions} indicateOperation />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return redirectIfUnauthorized(apiGateway, context.req.headers.cookie)
}

export default SellerPage