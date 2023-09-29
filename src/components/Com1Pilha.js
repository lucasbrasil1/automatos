import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSimbolo, removeSimbolo, selectCurrentAlfabeto } from './alfabetoSlice'
import { addEstado, selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { addInstrucao, selectCurrentInstrucoes } from './instrucoesSlice';
import Alfabeto from './Alfabeto';
import AddEstados from './AddEstados';
import InstrucoesCom1Pilha from './InstrucoesCom1Pilha';
import AlfabetoAuxiliar from './AlfabetoAuxiliar';

const Com1Pilha = () => {
    const alfabeto = useSelector(selectCurrentAlfabeto);
    const estados = useSelector(selectCurrentEstados);
    const instrucoes = useSelector(selectCurrentInstrucoes);
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
                            <p className='text-2xl p-2'>{`M = ({ ${alfabeto.join(',')} }, {${estados.join(',')} },  Π, q0, { ${finais.join(',')} }, V)`}</p>
                        </div>
                        <div className='bg-zinc-100 h-96 flex'>

                        </div>
                    </div>
                    <div className='bg-zinc-500 basis-1/4 flex flex-col p-1 rounded-xl'>
                        <Alfabeto />
                        <AlfabetoAuxiliar />
                        <AddEstados />
                        <InstrucoesCom1Pilha />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Com1Pilha