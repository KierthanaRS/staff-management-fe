import { configureStore } from '@reduxjs/toolkit'
import shiftReducer from './slice/shiftSlice'

export const store = configureStore({
  reducer: {
    shift: shiftReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch