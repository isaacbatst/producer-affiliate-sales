import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className='py-5 px-5 bg-slate-900'>
      <Link href='/'>
        <h1 className='text-2xl font-bold text-white'>Criadores e Afiliados</h1>
      </Link>
    </header>
  )
}

export default Header