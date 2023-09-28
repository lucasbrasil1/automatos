import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectExecutionExecuting } from './executionSlice';
import { selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { selectCurrentAlfabeto, selectCurrentAlfabetoAuxiliar } from './alfabetoSlice';
import Execution from './Execution';
import { addInstrucao } from './instrucoesSlice';
import { selectCurrentInstrucoes } from './instrucoesSlice';

const InstrucoesCom1Pilha = () => {
    const executing = useSelector(selectExecutionExecuting);
    const alfabeto = useSelector(selectCurrentAlfabeto);
    const alfabetoAuxiliar = useSelector(selectCurrentAlfabetoAuxiliar)
    const estados = useSelector(selectCurrentEstados);
    const finais = useSelector(selectCurrentEstadoFinal);
    const instrucoes = useSelector(selectCurrentInstrucoes);

    const dispatch = useDispatch();

    const [newInstructionFrom, setNewInstructionFrom] = useState();
    const [newInstructionValue, setNewInstructionValue] = useState('?');
    const [newInstructionTo, setNewInstructionTo] = useState();
    const [newInstructionRead1, setNewInstructionRead1] = useState('ε');
    const [newInstructionWrite1, setNewInstructionWrite1] = useState('ε');
    const [invalidNewInstruction, setInvalidNewInstruction] = useState('');
    const [isValidAutomate, setValidAutomate] = useState(false);

    useEffect(() => {
        setValidAutomate(!!instrucoes.find(q => finais.includes(q.to)));
    }, [instrucoes])

    const handleAddInstrucao = () => {
        const obj = {
            from: newInstructionFrom,
            value: newInstructionValue,
            to: newInstructionTo,
            read1: newInstructionRead1,
            write1: newInstructionWrite1
        }

        const error = invalidInstruction(obj);
        if (invalidInstruction(obj)) {
            setInvalidNewInstruction(error);
            return;
        }

        dispatch(addInstrucao(obj))
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

    const handleChangeNewInstructionFrom = (e) => setNewInstructionFrom(e.target.value)
    const handleChangeNewInstructionValue = (e) => setNewInstructionValue(e.target.value)
    const handleChangeNewInstructionTo = (e) => setNewInstructionTo(e.target.value)
    const handleRead1 = (e) => setNewInstructionRead1(e.target.value)
    const handleWrite1 = (e) => setNewInstructionWrite1(e.target.value)

    return (
        <div className='flex flex-col gap-1 p-1'>
            <p>Função de transição</p>
            {!executing &&
                <div className='flex gap-1'><select onChange={handleChangeNewInstructionFrom}><option>-</option>
                    {estados.filter(e => !finais.includes(e)).map(e => <option key={e} value={e}>{e}</option>)}</select> -
                    (<select onChange={handleChangeNewInstructionValue}><option value="?">?</option>
                        {alfabeto.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>,
                    <select onChange={handleRead1}>
                        <option value="ε">ε</option>
                        <option value="?">?</option>
                        {alfabetoAuxiliar.map(a => <option key={`aAux1${a}`} value={a}>{a}</option>)}
                    </select>,
                    <select onChange={handleWrite1}>
                        <option value="ε">ε</option>
                        {alfabetoAuxiliar.map(a => <option key={`aAux2${a}`} value={a}>{a}</option>)}
                    </select>
                    ) -
                    <select className={finais.includes(newInstructionTo) && 'bg-red-200'} onChange={handleChangeNewInstructionTo}><option className='bg-white'>-</option>
                        {estados.map(e => <option className={finais.includes(e) && e !== '' ? 'bg-red-200' : 'bg-white'} key={e} value={e}>{e}</option>)}
                    </select>

                </div>}
            {invalidNewInstruction !== '' && <p className='text-red-100'>{invalidNewInstruction}</p>}
            <button disabled={executing} onClick={handleAddInstrucao} className='bg-zinc-600 my-1 rounded'>Adicionar Instrução</button>
            <Execution valid={isValidAutomate} />
        </div>
    )
}

export default InstrucoesCom1Pilha