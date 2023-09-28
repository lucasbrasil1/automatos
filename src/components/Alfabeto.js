import React, { useState } from 'react'
import { addSimbolo, selectCurrentAlfabeto } from './alfabetoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectExecutionExecuting } from './executionSlice';

const Alfabeto = () => {
    const alfabeto = useSelector(selectCurrentAlfabeto);
    const executing = useSelector(selectExecutionExecuting);
    const dispatch = useDispatch()
    const [inputSymbol, setInputSymbol] = useState('');

    const handleChangeInputSymbol = (e) => {
        const input = e.target.value;

        const symbolExists = alfabeto.includes(input);

        if (!symbolExists) {
            setInputSymbol(input);
            dispatch(addSimbolo(input));
        }

        setInputSymbol('');
    }

    return (
        <div className='flex gap-1 justify-between'>
            <p className='font-bold text-xl'>Alfabeto</p>
            <input disabled={executing} type="text" value={inputSymbol} onChange={handleChangeInputSymbol} className='w-12 p-1 rounded' />
        </div>
    )
}

export default Alfabeto