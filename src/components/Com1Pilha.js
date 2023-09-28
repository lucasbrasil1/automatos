import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSimbolo, removeSimbolo, selectCurrentAlfabeto } from './alfabetoSlice'
import { addEstado, selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { addInstrucao, selectCurrentInstrucoes } from './instrucoesSlice';
import Alfabeto from './Alfabeto';
import AddEstados from './AddEstados';
import InstrucoesCom1Pilha from './InstrucoesCom1Pilha';
import AlfabetoAuxiliar from './AlfabetoAuxiliar';
import { fail, next, selectExecutionCurrentState, selectExecutionExecuting, selectExecutionInput, selectExecutionMessage, selectExecutionPile1, selectExecutionSuccess, success } from './executionSlice';
import Diagrama1Pilha from './Diagrama1Pilha';

const Com1Pilha = () => {
    const alfabeto = useSelector(selectCurrentAlfabeto);
    const estados = useSelector(selectCurrentEstados);
    const finais = useSelector(selectCurrentEstadoFinal);
    const executing = useSelector(selectExecutionExecuting);
    const isSuccess = useSelector(selectExecutionSuccess);
    const instrucoes = useSelector(selectCurrentInstrucoes);
    const state = useSelector(selectExecutionCurrentState);
    const current = useSelector(selectExecutionInput);
    const executionMessage = useSelector(selectExecutionMessage);
    const pile1 = useSelector(selectExecutionPile1);

    const [tryValue, setTryValue] = useState('');

    const dispatch = useDispatch()

    const handleChangeValue = (e) => {
        const value = e.target.value
        validateAutomate(value);
    }

    const validateAutomate = (v) => {
        const instr = instrucoes.find(i => i.from === state && i.value === v);

        if (isSuccess ||
            !instrucoes.length ||
            !alfabeto.includes(v) ||
            !instr) {
            dispatch(fail("Falha na instrução"));
            return;
        };

        const { from, value, to, read1, write1 } = instr;

        console.log(pile1[pile1.length - 1]);

        if (read1 !== 'ε' && !pile1.length) {
            dispatch(fail("Não é possível ler da pilha vazia"));
            return;
        }

        if (read1 !== 'ε' && pile1[pile1.length - 1] && read1 !== pile1[pile1.length - 1]) {
            dispatch(fail("Valor incorreto ao ler da pilha"));
            return;
        }

        dispatch(next(instr));

        console.log(value, pile1.length);
        if (finais.includes(to)) {

            if (pile1.length > 1) {
                dispatch(fail("Pilha não terminou vazia!"))
                return;
            }
            dispatch(success());
        }

    }



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
                            <div className='basis-1/2 flex flex-col p-4 rounded-xl text-xl'>
                                <>
                                    {executing && <input disabled={!!executionMessage} className='mx-12 p-1 text-center' value={tryValue} onChange={handleChangeValue} />}
                                    <p>{current}</p>
                                    <p className={isSuccess ? 'text-green-600' : 'text-red-600'}>{executionMessage}</p>
                                </>
                            </div>
                            <div className='basis-1/2'>
                                <Diagrama1Pilha />
                            </div>
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