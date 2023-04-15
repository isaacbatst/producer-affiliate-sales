import React from 'react'

type Props = {}

const Header: React.FC = (props: Props) => {
  return (
    <header className='py-3 px-5 bg-slate-900'>
      <h1 className='text-2xl font-bold text-theme-yellow-500'>Criadores e Afiliados</h1>
    </header>
  )
}

export default Header