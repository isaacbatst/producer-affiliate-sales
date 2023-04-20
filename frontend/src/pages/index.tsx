import Header from '@/components/common/Header'
import { useApiGateway } from '@/contexts/ApiGatewayContext'
import { AppError } from '@/domain/Errors/ AppError'
import { ValidationError } from '@/domain/Errors/ValidationError'
import { redirectIfAuthorized } from '@/infra/validateAuth'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FormEventHandler, useRef, useState } from 'react'
import { useSWRConfig } from 'swr'

class LoginSubmitErrorHandler {
  static handle(error: unknown): string {
    if(error instanceof AppError) {
      return error.message
    }

    if(!(axios.isAxiosError(error))){
      return 'Erro desconhecido'
    }

    if(error.response?.status === 401) {
      return 'Usuário ou senha inválidos'
    }

    if(error.response?.status === 400) {
      return 'Dados inválidos'
    }

    return 'Erro desconhecido'
  }
}

export default function Login() {
  const {apiGateway} = useApiGateway()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const {mutate} = useSWRConfig()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setSubmitError(null)
    
    try {
      const email = emailRef.current?.value
      const password = passwordRef.current?.value

      if (!email || !password) {
        throw new ValidationError('Email e senha são obrigatórios')
      }

      await apiGateway.login(email, password)
      await mutate('auth')
      router.push('/home')
    } catch (error) {
      const readableError = LoginSubmitErrorHandler.handle(error)
      setSubmitError(readableError)
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className='pt-10 flex flex-col items-center'>
        <h1 className='text-center text-xl mb-10'>Logue para acessar o sistema</h1>
        <form className='flex flex-col' onSubmit={onSubmit}>
          <div className='mb-3 flex flex-col'>
            <label htmlFor="email" className='mr-3 text-lg'>E-mail</label>
            <input id='email' type="email" ref={emailRef} 
              className='border border-slate-300 rounded-lg text-xl p-2' 
            />
          </div>
          <div className='mb-3 flex flex-col'>
            <label htmlFor="password" className='mr-3 text-lg'>Senha</label>
            <input id="password" type="password" ref={passwordRef} 
              className='border border-slate-300 rounded-lg text-xl p-2'   
            />
          </div>
          <button type='submit' 
            className='font-semibold bg-theme-yellow-500 rounded-lg border
             border-slate-300 py-3 mb-3 hover:scale-105 transition-all active:opacity-70'>
            Entrar
          </button>
          {submitError && <p className='text-red-500' role='alert'>{submitError}</p>}
        </form>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return redirectIfAuthorized(context.req.headers.cookie)
}