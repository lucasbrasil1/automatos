import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    instrucoes : []
}

const instrucoesSlice = createSlice({
    name: 'instrucoes',
    initialState: initalState,
    reducers: {
        addInstrucao: (state, action) => {
            state.instrucoes.push(action.payload);
        },
        removeInstrucao: (state, action) => {
            const indexToRemove = action.payload;
            state.instrucoes.splice(indexToRemove, 1);
        }
    }
})

export const { addInstrucao, removeInstrucao } =  instrucoesSlice.actions

export default instrucoesSlice.reducer

export const selectCurrentInstrucoes = state => state.instrucoes.instrucoes;