import Header from '@/components/common/Header'
import TransactionsList from '@/components/common/TransactionsList/TransactionsList'
import SalesForm from '@/components/Home/SalesForm'
import { useTransactions } from '@/hooks/useTransactions'
import { ApiGatewayFactory } from '@/infra/gateways/ApiGatewayFactory'

const apiGateway = ApiGatewayFactory.make()

export default function Home() {
  const {isLoading, transactions} = useTransactions(apiGateway)

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <SalesForm apiGateway={apiGateway} />
      <TransactionsList isLoading={isLoading} transactions={transactions} />
    </main>
  )
}
