import React, { useEffect, useState } from 'react'
import { selectExecutionExecuting, stop } from './executionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { selectCurrentAlfabeto } from './alfabetoSlice';
import { addInstrucao, selectCurrentInstrucoes } from './instrucoesSlice';
import Execution from './Execution';

const InstrucoesFinito = () => {
    const executing = useSelector(selectExecutionExecuting);
    const alfabeto = useSelector(selectCurrentAlfabeto);
    const estados = useSelector(selectCurrentEstados);
    const finais = useSelector(selectCurrentEstadoFinal);
    const instrucoes = useSelector(selectCurrentInstrucoes);

    const dispatch = useDispatch()

    const [newInstructionFrom, setNewInstructionFrom] = useState();
    const [newInstructionValue, setNewInstructionValue] = useState();
    const [newInstructionTo, setNewInstructionTo] = useState();
    const [isValidAutomate, setValidAutomate] = useState(false);
    const [invalidNewInstruction, setInvalidNewInstruction] = useState('');

    useEffect(() => {
        setValidAutomate(!!instrucoes.find(q => finais.includes(q.to)));
    }, [instrucoes])

    const handleChangeNewInstructionFrom = (e) => setNewInstructionFrom(e.target.value)
    const handleChangeNewInstructionValue = (e) => setNewInstructionValue(e.target.value)
    const handleChangeNewInstructionTo = (e) => setNewInstructionTo(e.target.value)

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

    return (
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

            <Execution valid={isValidAutomate} />
        </div>
    )
}

export default InstrucoesFinito