import React from 'react'

type Props = {
  onClick: () => void
}

const LogoutButton = ({onClick}: Props) => {
  return (
    <button 
      className='text-white border border-slate-100 rounded-lg px-5 py-2
      hover:scale-105 transition-all active:opacity-70'    
      onClick={onClick}
    >
      Sair
    </button>
  )
}

export default LogoutButton