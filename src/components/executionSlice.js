import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    executing: false,
    success: false,
    message: "",
    currentState: 'q0',
    input : ''
}

const executionSlice = createSlice({
    name: 'execution',
    initialState: initalState,
    reducers: {
        start: (state) => {
            state.success = false;
            state.message = "";
            state.currentState = "q0";
            state.input = "";
            state.executing = true;
        },
        stop: (state) => {
            state.executing = false;
        },
        success : (state) => {
            state.success = true;
            state.message = "Input válido!"
        },
        fail : (state) => {
            state.success = false;
            state.message = "Instrução inválida, encerrando execução.";
        },
        next: (state, action) => {
            const {from, value, to} = action.payload;
            state.input = state.input.concat(value);
            state.currentState = to;
        }
    }
})

export const { start, stop, success, fail, next } = executionSlice.actions

export default executionSlice.reducer
export const selectExecutionExecuting = state => state.execution.executing;
export const selectExecutionSuccess = state => state.execution.success;
export const selectExecutionMessage = state => state.execution.message;
export const selectExecutionCurrentState = state => state.execution.currentState;
export const selectExecutionInput = state => state.execution.input;