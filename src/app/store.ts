import { configureStore } from '@reduxjs/toolkit'
import shiftReducer from './slice/shiftSlice'
import staffReducer from './slice/staffSlice'

export const store = configureStore({
  reducer: {
    shift: shiftReducer,
    staff: staffReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch