import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectExecutionExecuting } from './executionSlice';
import { addSimboloAuxiliar, removeSimboloAuxiliar, selectCurrentAlfabeto, selectCurrentAlfabetoAuxiliar } from './alfabetoSlice';

const AlfabetoAuxiliar = () => {
    const executing = useSelector(selectExecutionExecuting);
    const alfabeto = useSelector(selectCurrentAlfabeto);
    const alfabetoAuxiliar = useSelector(selectCurrentAlfabetoAuxiliar);
    const dispatch = useDispatch()
    const [inputSymbol, setInputSymbol] = useState('');

    const handleChangeInputSymbol = (e) => {
        const input = e.target.value;

        const symbolExists = alfabeto.includes(input)
            || alfabetoAuxiliar.includes(input);

        if (!symbolExists) {
            setInputSymbol(input);
            dispatch(addSimboloAuxiliar(input));
        }

        setInputSymbol('');
    }

    const handleDeleteSymbol = (i) => {
        dispatch(removeSimboloAuxiliar(i));
    }

    return (
        <div className='flex flex-col border-b gap-1'>
            <div className='flex gap-1 justify-between'>
                <p className='font-bold text-xl'>Alfabeto Auxiliar</p>
                <input disabled={executing} type="text" value={inputSymbol} onChange={handleChangeInputSymbol} className='w-12 p-1 rounded' />
            </div>
            <div className='flex flex-col'>
                <div className='flex gap-1'>
                    <div className='text-3xl flex flex-wrap gap-1'>V:  {alfabetoAuxiliar && alfabetoAuxiliar.map((s, i) => <div key={i} onClick={() => handleDeleteSymbol(i)} className='px-1 bg-zinc-600 rounded-full hover:bg-red-400 cursor-pointer'>
                        {s}
                    </div>)}</div>
                </div>
            </div>
        </div>
    )
}

export default AlfabetoAuxiliar