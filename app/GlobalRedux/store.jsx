"use client"

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/authSlice';
import productReducer from './Features/productSlice';

const store = configureStore({
  reducer: {
    auth:authReducer,
    product:productReducer,
    
  }
});


export default store;
