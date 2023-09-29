import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectExecutionExecuting, start, stop } from './executionSlice';

const Execution = ({valid}) => {
    const executing = useSelector(selectExecutionExecuting);

    const dispatch = useDispatch();

    const handleExecute = () => {
        dispatch(start());
    }

    return (
        executing ?
            <button onClick={() => dispatch(stop())} className='bg-zinc-600 rounded'>Parar execução</button>
            : valid ? <button onClick={handleExecute} className='bg-zinc-600 rounded'>Executar</button> : null

    )
}

export default Execution