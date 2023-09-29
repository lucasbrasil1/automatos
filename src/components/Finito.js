import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentAlfabeto } from './alfabetoSlice'
import { selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { selectCurrentInstrucoes } from './instrucoesSlice';
import Alfabeto from './Alfabeto';
import { fail, selectExecutionExecuting, success, next, selectExecutionCurrentState, selectExecutionMessage, selectExecutionInput } from './executionSlice';
import { selectExecutionSuccess } from './executionSlice';
import AddEstados from './AddEstados';
import InstrucoesFinito from './InstrucoesFinito';

const Finito = () => {

    const alfabeto = useSelector(selectCurrentAlfabeto);
    const estados = useSelector(selectCurrentEstados);
    const instrucoes = useSelector(selectCurrentInstrucoes)
    const finais = useSelector(selectCurrentEstadoFinal);
    const executing = useSelector(selectExecutionExecuting);
    const current = useSelector(selectExecutionInput);
    const state = useSelector(selectExecutionCurrentState);
    const executionMessage = useSelector(selectExecutionMessage);
    const isSuccess = useSelector(selectExecutionSuccess);

    const [tryValue, setTryValue] = useState('');

    const dispatch = useDispatch()

    const handleChangeValue = (e) => {
        const value = e.target.value
        validateAutomate(value);
    }

    const validateAutomate = (v) => {
        if (isSuccess || !instrucoes.length || !alfabeto.includes(v)) return;

        const instr = instrucoes.find(i => i.from === state && i.value === v);

        if (instr) {
            const { from, value, to } = instr;

            dispatch(next(instr));

            if (finais.includes(to)) {
                dispatch(success());
            }
        } else {
            dispatch(fail());
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col'>
                <p className='p-4 text-4xl text-center'>Autômato Finito</p>
                <p>Definição: M =  ( Q, Σ, δ, q0, F )</p>
                <p>Um autômato finito consiste de:</p>
                <p> • um conjunto de estados Q;</p>
                <p> • um alfabeto Σ;</p>
                <p> • transições rotuladas entre estados δ;</p>
                <p> • um estado inicial q0 ∈ Q;</p>
                <p> • e um conjunto de estados de aceitação F. </p>
                <div className='flex w-screen'>
                    <div className='flex flex-col gap-6 bg-white basis-3/4 rounded-xl p-1 justify-center'>
                        <div className='w-full flex flex-wrap gap-1'>
                            <p className='text-2xl p-2'>{`M = ({ ${estados.join(',')} }, {${alfabeto.join(',')} }, δ, ${estados.at(0) || '...'}, { ${finais.join(',')} })`}</p>
                        </div>
                        <div className='bg-zinc-100 h-96 flex'>
                            <div className='basis-1/2 flex flex-col p-4 rounded-xl text-xl'>
                                <>
                                    {executing && <input className='mx-12 p-1 text-center' value={tryValue} onChange={handleChangeValue} />}
                                    <p>{current}</p>
                                    <p className={isSuccess ? 'text-green-600' : 'text-red-600'}>{executionMessage}</p>
                                </>
                            </div>
                            <div className='basis-1/2'>
                                <StateMachineDiagram transitions={instrucoes} finais={finais} currentState={next} />
                            </div>
                        </div>
                    </div>
                    <div className='bg-zinc-500 basis-1/4 flex flex-col p-1 rounded-xl'>

                        <Alfabeto />

                        <AddEstados />

                        <InstrucoesFinito />
                    </div>
                </div>
            </div>
        </div>
    )
}

const StateMachineDiagram = ({ transitions, finais, currentState }) => {
    return (
        <div className='flex flex-col'>
            {transitions.map((t, i) => {
                const to = finais.includes(t.to) ? <b>{t.to}</b> : t.to;
                return (<div className='flex'>
                    <div className='w-10'>
                        {currentState === t.from && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>}
                    </div>
                    <p className={currentState === t.from ? 'bg-blue-200' : null}>{`δ( ${t.from}, ${t.value} ) = `}{to}</p>
                </div>
                )
            })}
        </div>
    );
};


export default Finito

