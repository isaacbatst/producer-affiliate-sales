import React from 'react'

type Props = {
  onClick: () => void
}

const LogoutButton = ({onClick}: Props) => {
  return (
    <button 
      className='text-white border border-slate-100 rounded-lg px-5 py-2
     hover:bg-white hover:text-slate-900 transition-colors'    
      onClick={onClick}
    >
      Sair
    </button>
  )
}

export default LogoutButton