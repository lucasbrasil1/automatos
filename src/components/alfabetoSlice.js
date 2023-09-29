import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    alfabeto: [],
    auxiliar: []
}

const alfabetoSlice = createSlice({
    name: 'alfabeto',
    initialState: initalState,
    reducers: {
        addSimbolo: (state, action) => {
            state.alfabeto.push(action.payload);
        },
        removeSimbolo: (state, action) => {
            const indexToRemove = action.payload;
            state.alfabeto.splice(indexToRemove, 1);
        },
        addSimboloAuxiliar: (state, action) => {
            state.auxiliar.push(action.payload);
        },
        removeSimboloAuxiliar: (state, action) => {
            const indexToRemove = action.payload;
            state.auxiliar.splice(indexToRemove, 1);
        }
    }
})

export const { addSimbolo, removeSimbolo, addSimboloAuxiliar, removeSimboloAuxiliar } = alfabetoSlice.actions

export default alfabetoSlice.reducer
export const selectCurrentAlfabeto = state => state.alfabeto.alfabeto;
export const selectCurrentAlfabetoAuxiliar = state => state.alfabeto.auxiliar;