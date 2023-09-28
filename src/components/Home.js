import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='p-16 flex justify-center'>
      <div className='flex flex-col gap-10'>
        <button className='main-btn' onClick={() => navigate('/afd')}>Criar Autômato Finito Determinístico (AFD)</button>
        <button className='main-btn' onClick={() => navigate('/a1p')}>Criar Autômato de 1 pilha</button>
        <button className='main-btn' onClick={() => navigate('/a2p')}>Criar Autômato de 2 pilhas</button>
      </div>
    </div>
  )
}

export default Home