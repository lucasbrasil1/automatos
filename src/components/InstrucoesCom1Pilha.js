import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectExecutionExecuting } from './executionSlice';
import { selectCurrentEstadoFinal, selectCurrentEstados } from './estadosSlice';
import { selectCurrentAlfabeto, selectCurrentAlfabetoAuxiliar } from './alfabetoSlice';

const InstrucoesCom1Pilha = () => {
    const executing = useSelector(selectExecutionExecuting);
    const alfabeto = useSelector(selectCurrentAlfabeto);
    const alfabetoAuxiliar = useSelector(selectCurrentAlfabetoAuxiliar)
    const estados = useSelector(selectCurrentEstados);
    const finais = useSelector(selectCurrentEstadoFinal);

    const [newInstructionFrom, setNewInstructionFrom] = useState();
    const [newInstructionValue, setNewInstructionValue] = useState();
    const [newInstructionTo, setNewInstructionTo] = useState();
    const [newInstructionRead1, setNewInstructionRead1] = useState();
    const [newInstructionWrite1, setNewInstructionWrite1] = useState();

    const handleChangeNewInstructionFrom = (e) => setNewInstructionFrom(e.target.value)
    const handleChangeNewInstructionValue = (e) => setNewInstructionValue(e.target.value)
    const handleChangeNewInstructionTo = (e) => setNewInstructionTo(e.target.value)
    const handleRead1 = (e) => setNewInstructionRead1(e.target.value)
    const handleWrite1 = (e) => setNewInstructionWrite1(e.target.value)

    return (
        <div className='flex flex-col gap-1 p-1'>
            <p>Função de transição</p>
            <div className='flex gap-1'>
                {!executing &&
                    <><select onChange={handleChangeNewInstructionFrom}><option>-</option>
                        {estados.filter(e => !finais.includes(e)).map(e => <option key={e} value={e}>{e}</option>)}</select> -
                        (<select onChange={handleChangeNewInstructionValue}><option>-</option>
                            {alfabeto.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>,
                        <select onChange={handleRead1}>
                            <option value="ε">ε</option>
                            <option value="?">?</option>
                            {alfabetoAuxiliar.map(a => <option key={`aAux1${a}`} value={a}>{a}</option>)}
                        </select>,
                        <select onChange={handleWrite1}>
                            <option value="ε">ε</option>
                            <option value="?">?</option>
                            {alfabetoAuxiliar.map(a => <option key={`aAux2${a}`} value={a}>{a}</option>)}
                        </select>
                        ) -
                        <select className={finais.includes(newInstructionTo) && 'bg-red-200'} onChange={handleChangeNewInstructionTo}><option className='bg-white'>-</option>
                            {estados.map(e => <option className={finais.includes(e) && e !== '' ? 'bg-red-200' : 'bg-white'} key={e} value={e}>{e}</option>)}
                        </select>
                    </>}
            </div>
        </div>
    )
}

export default InstrucoesCom1Pilha