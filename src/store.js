import { configureStore } from "@reduxjs/toolkit";
import alfabetoReducer from './components/alfabetoSlice'
import estadosReducer from './components/estadosSlice'
import instrucoesReducer from './components/instrucoesSlice'
import executionReducer from "./components/executionSlice";

export const store = configureStore({
    reducer : {
        alfabeto : alfabetoReducer,
        estados : estadosReducer,
        instrucoes : instrucoesReducer,
        execution : executionReducer
    },
    devTools: false
})