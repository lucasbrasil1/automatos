import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    alfabeto: [],
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
        }
    }
})

export const { addSimbolo, removeSimbolo } = alfabetoSlice.actions

export default alfabetoSlice.reducer
export const selectCurrentAlfabeto = state => state.alfabeto.alfabeto;