import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeEstado, selectCurrentEstadoFinal, selectCurrentLastEstado } from './estadosSlice'

const Estado = ({ estado }) => {
    const final = useSelector(selectCurrentEstadoFinal); 
    const last = useSelector(selectCurrentLastEstado);

    const dispatch = useDispatch();

    const handleRemoveState = () => {
        if(estado === last) dispatch(removeEstado(estado))
    }

    return (
        <div onClick={handleRemoveState} className={`bg-zinc-200 w-10 h-10 text-center rounded-full flex cursor-pointer border border-black ${estado === 'q0' && 'border-2'} ${final.indexOf(estado) !== -1 && 'border-red-500 border-4'}`}>
            <p className={`m-auto ${(estado === 'q0' || final.indexOf(estado) !== -1) && 'font-bold'}`}>{estado}</p>
        </div>
    )
}

export default Estado