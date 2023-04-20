import { useApiGateway } from '@/contexts/ApiGatewayContext'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'

const Header: React.FC = () => {
  const {apiGateway} = useApiGateway()
  const router = useRouter()
  const {mutate} = useSWRConfig()
  const {user, isLoading} = useAuth(apiGateway)
  const onLogout = async () => {
    await apiGateway.logout()
    await mutate('auth', undefined)
    router.push('/')
  }

  return (
    <header className='p-5 bg-slate-900 flex flex-col'>
      <div className="flex justify-between items-center container mx-auto">
        <Link href='/'>
          <h1 className='text-2xl font-bold text-white'>Criadores e Afiliados</h1>
        </Link>
        {
          !isLoading && user && (
            <LogoutButton onClick={onLogout}/>
          )
        }
      </div>
    </header>
  )
}

export default Header