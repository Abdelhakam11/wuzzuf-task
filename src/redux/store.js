import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from './APISlice';

export const myStore=configureStore({
    reducer:{
        jobsReducer
    }
})