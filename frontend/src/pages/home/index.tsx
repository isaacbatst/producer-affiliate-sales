import Header from '@/components/common/Header'
import TransactionsList from '@/components/common/TransactionsList/TransactionsList'
import SalesForm from '@/components/Home/SalesForm'
import { useApiGateway } from '@/contexts/ApiGatewayContext'
import { useTransactions } from '@/hooks/useTransactions'
import { redirectIfUnauthorized } from '@/infra/validateAuth'
import { GetServerSideProps } from 'next'

export default function Home() {
  const {apiGateway} = useApiGateway()
  const {isLoading, transactions} = useTransactions(apiGateway)
  return (
    <main className="flex flex-col min-h-screen">
      <Header/>
      <SalesForm apiGateway={apiGateway} />
      <TransactionsList isLoading={isLoading} transactions={transactions} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return redirectIfUnauthorized(context.req.headers.cookie)
}