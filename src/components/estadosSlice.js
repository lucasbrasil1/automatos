import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    estados : [],
    final: []
}

const estadosSlice = createSlice({
    name: 'estados',
    initialState: initalState,
    reducers: {
        addEstado : (state, action = null) => {
            const payload = action.payload;
            const estado = 'q'.concat(state.estados.length);
            state.estados.push(estado)
            if(payload?.final === true) state.final.push(estado);
        },
        removeEstado : (state, action) => {
            const estadoToRemove = action.payload;
            state.estados = state.estados.filter(estado => estado !== estadoToRemove);
            state.final = state.final.filter(finalEstado => finalEstado !== estadoToRemove);
        }
    }
})

export const { addEstado, removeEstado } =  estadosSlice.actions

export default estadosSlice.reducer
export const selectCurrentEstados = state => state.estados.estados;
export const selectCurrentEstadoFinal = state => state.estados.final;
export const selectCurrentLastEstado = state => state.estados.estados[state.estados.estados.length-1] || false;