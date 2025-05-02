import { configureStore } from '@reduxjs/toolkit'
import levelsReducer from './slices/levelsSlice'
import bananasReducer from './slices/bananasSlice'

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
    bananas: bananasReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
