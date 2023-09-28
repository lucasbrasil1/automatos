import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSimbolo, removeSimbolo, selectCurrentAlfabeto } from './alfabetoSlice'
import { addEstado, selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { addInstrucao, selectCurrentInstrucoes } from './instrucoesSlice';

const Com1Pilha = () => {
  const alfabeto = useSelector(selectCurrentAlfabeto);
  const estados = useSelector(selectCurrentEstados);
  const instrucoes = useSelector(selectCurrentInstrucoes)
  const finais = useSelector(selectCurrentEstadoFinal);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col'>
        <p className='p-4 text-4xl text-center'>Autômato Com 1 Pilha</p>
        <p>Definição: M =  ( Σ, Q, Π, q0, F, V )</p>
        <p> • um alfabeto Σ;</p>
        <p> • um conjunto de estados Q;</p>
        <p> • função de transição Π;</p>
        <p> • um estado inicial q0 ∈ Q;</p>
        <p> • um conjunto de estados de aceitação F. </p>
        <p> • e um alfabeto auxiliar V. </p>
        <div className='flex w-screen'>
          <div className='flex flex-col gap-6 bg-white basis-3/4 rounded-xl p-1 justify-center'>
            <div className='w-full flex flex-wrap gap-1'>

            </div>
          </div>
          <div className='bg-zinc-500 basis-1/4 flex flex-col p-1 rounded-xl'>
                        {/* <div className='flex flex-col border-b gap-1'>
                            <div className='flex gap-1 justify-between'>
                                <p className='font-bold text-xl'>Alfabeto</p>
                                <input type="text" value={inputSymbol} onChange={handleChangeInputSymbol} className='w-12 p-1 rounded' />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-1'>
                                    <div className='text-3xl flex flex-wrap gap-1'>Σ:  {alfabeto && alfabeto.map((s, i) => <div key={i} onClick={() => handleDeleteSymbol(i)} className='px-1 bg-zinc-600 rounded-full hover:bg-red-400 cursor-pointer'>
                                        {s}
                                    </div>)}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col border-b gap-1 p-1'>
                            <button disabled={executing} className='bg-zinc-600 rounded' onClick={() => handleAddEstado()}>Adicionar Estado {!estados.length && <b>Inicial</b>}</button>
                            <button disabled={executing} className='bg-zinc-600 rounded' onClick={() => handleAddEstadoFinal()}>Adicionar Estado <b>Final</b></button>
                        </div>
                        <div className='flex flex-col gap-1 p-1'>
                            <p>Instruções Rotuladas</p>
                            <div className='flex gap-1'>
                                {!executing &&
                                <>δ(<select onChange={handleChangeNewInstructionFrom}><option>-</option>
                                    {estados.filter(e => !finais.includes(e)).map(e => <option key={e} value={e}>{e}</option>)}</select> ,
                                <select onChange={handleChangeNewInstructionValue}><option>-</option>
                                    {alfabeto.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>) =
                                <select className={finais.includes(newInstructionTo) && 'bg-red-200'} onChange={handleChangeNewInstructionTo}><option className='bg-white'>-</option>
                                    {estados.map(e => <option className={finais.includes(e) && e !== '' ? 'bg-red-200' : 'bg-white'} key={e} value={e}>{e}</option>)}
                                </select>
                                </>}
                            </div>
                            {invalidNewInstruction !== '' && <p className='text-red-100'>{invalidNewInstruction}</p>}
                            <button disabled={executing} onClick={handleAddInstrucao} className='bg-zinc-600 my-1 rounded'>Adicionar Instrução</button>

                            {executing ?
                                <button onClick={() => setExecuting(false)} className='bg-zinc-600 rounded'>Parar execução</button>
                                : isValidAutomate ? <button onClick={handleExecute} className='bg-zinc-600 rounded'>Executar</button> : null}
                        </div> */}
                    </div>
        </div>
      </div>
    </div>
  )
}

export default Com1Pilha