import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSimbolo, removeSimbolo, selectCurrentAlfabeto } from './alfabetoSlice'
import { addEstado, selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { addInstrucao, selectCurrentInstrucoes } from './instrucoesSlice';
import Alfabeto from './Alfabeto';
import { fail, selectExecutionExecuting, start, stop, success, next, selectExecutionCurrentState, selectExecutionMessage, selectExecutionInput } from './executionSlice';
import { selectExecutionSuccess } from './executionSlice';

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

    const [newInstructionFrom, setNewInstructionFrom] = useState();
    const [newInstructionValue, setNewInstructionValue] = useState();
    const [newInstructionTo, setNewInstructionTo] = useState();
    const [invalidNewInstruction, setInvalidNewInstruction] = useState('');
    const [isValidAutomate, setValidAutomate] = useState(false);
    const [tryValue, setTryValue] = useState('');

    const handleChangeNewInstructionFrom = (e) => setNewInstructionFrom(e.target.value)
    const handleChangeNewInstructionValue = (e) => setNewInstructionValue(e.target.value)
    const handleChangeNewInstructionTo = (e) => setNewInstructionTo(e.target.value)

    const dispatch = useDispatch()

    

    const handleDeleteSymbol = (i) => {
        dispatch(removeSimbolo(i));
    }

    const handleAddEstado = () => {
        dispatch(addEstado());
    }

    const handleAddEstadoFinal = () => {
        dispatch(addEstado({ final: true }));
    }


    const handleAddInstrucao = () => {
        const obj = {
            from: newInstructionFrom,
            value: newInstructionValue,
            to: newInstructionTo,
        }

        const error = invalidInstruction(obj);
        if (invalidInstruction(obj)) {
            setInvalidNewInstruction(error);
            console.log("Inválido")
            return;
        }

        dispatch(addInstrucao(
            {
                from: newInstructionFrom,
                value: newInstructionValue,
                to: newInstructionTo,
            }
        ))
    }

    function invalidInstruction(obj) {
        if (!obj.from || !obj.value || !obj.to ||
            obj.from === "" || obj.value === "" || obj.to === "" ||
            obj.from === "-" || obj.value === "-" || obj.to === "-") {
            return "Não pode ter valores vazios!";
        }

        if (instrucoes.some(instrucao => instrucao.from === obj.from && instrucao.value === obj.value)) {
            return `Já existe a instrução ${obj.from} -> ${obj.value}`;
        }

        if (instrucoes.some(instrucao => instrucao.from === obj.from && instrucao.to === obj.to)) {
            return `Já existe a instrução ${obj.from} -> ${obj.to}`;
        }

        return "";
    }

    const handleExecute = () => {
        dispatch(start());
    }

    const handleChangeValue = (e) => {
        const value = e.target.value
        validateAutomate(value);
    }

    const validateAutomate = (v) => {
        if (!instrucoes.length) {
            return false;
        }

        if (!alfabeto.includes(v)) {
            return false;
        }

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

    useEffect(() => {
        setValidAutomate(!!instrucoes.find(q => finais.includes(q.to)));
    }, [instrucoes])

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
                        <div className='flex flex-col border-b gap-1'>
                            <Alfabeto />
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
                                <button onClick={() => dispatch(stop())} className='bg-zinc-600 rounded'>Parar execução</button>
                                : isValidAutomate ? <button onClick={handleExecute} className='bg-zinc-600 rounded'>Executar</button> : null}
                        </div>
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

