import React from 'react'
import { addEstado, selectCurrentEstados } from './estadosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectExecutionExecuting } from './executionSlice';

const AddEstados = () => {
    const executing = useSelector(selectExecutionExecuting);
    const estados = useSelector(selectCurrentEstados);
    const dispatch = useDispatch()

    const handleAddEstado = () => {
        dispatch(addEstado());
    }

    const handleAddEstadoFinal = () => {
        dispatch(addEstado({ final: true }));
    }

    return (
        <div className='flex flex-col border-b gap-1 p-1'>
            <button disabled={executing} className='bg-zinc-600 rounded' onClick={() => handleAddEstado()}>Adicionar Estado {!estados.length && <b>Inicial</b>}</button>
            <button disabled={executing} className='bg-zinc-600 rounded' onClick={() => handleAddEstadoFinal()}>Adicionar Estado <b>Final</b></button>
        </div>
    )
}

export default AddEstados