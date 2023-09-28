import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    executing: false,
    success: false,
    message: "",
    currentState: 'q0',
    input : '',
    pile1 : [],
    pile2 : []
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
            state.pile1 = [];
            state.pile2 = [];
            state.executing = true;
        },
        stop: (state) => {
            state.executing = false;
        },
        success : (state) => {
            state.success = true;
            state.message = "Input válido!"
        },
        fail : (state, action) => {
            state.success = false;
            state.message = action.payload;
        },
        next: (state, action) => {
            const {from, value, to, read1, write1, read2, write2} = action.payload;
            state.input = state.input.concat(value);
            state.currentState = to;
            if(read1 && read1 !== "ε") state.pile1.pop(read1);
            if(write1 && write1 !== "ε") state.pile1.push(write1);
            if(read2 && read2 !== "ε") state.pile1.pop(read2);  
            if(write2 && write1 !== "ε") state.pile1.push(write2);
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
export const selectExecutionPile1 = state => state.execution.pile1;
export const selectExecutionPile2 = state => state.execution.pile2;