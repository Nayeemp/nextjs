/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import ButtonReducer from '../features/Button/ButtonSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      Button : ButtonReducer
    }
  })
}