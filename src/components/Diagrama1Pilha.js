import React from 'react'
import { useSelector } from 'react-redux';
import { selectExecutionCurrentState, selectExecutionPile1 } from './executionSlice';
import { selectCurrentEstadoFinal } from './estadosSlice';
import { selectCurrentInstrucoes } from './instrucoesSlice';

const Diagrama1Pilha = () => {
    const instrucoes = useSelector(selectCurrentInstrucoes);
    const finais = useSelector(selectCurrentEstadoFinal);
    const currentState = useSelector(selectExecutionCurrentState);
    const pile1 = useSelector(selectExecutionPile1);

    return (
        <div className='flex flex-col'>
            {instrucoes.map((t) => {
                const to = finais.includes(t.to) ? <b>{t.to}</b> : t.to;
                return (<div className='flex'>
                    <div className='w-10'>
                        {currentState === t.from && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>}
                    </div>
                    <p className={currentState === t.from ? 'bg-blue-200' : null}>{`${t.from} ( ${t.value}, ${t.read1}, ${t.write1} ) = `}{to}</p>
                </div>
                )
            })}
            {pile1 && <p className='my-5'>Pilha: {pile1.map(i => <div>{i}</div>)}</p>}
        </div>
    )
}

export default Diagrama1Pilha