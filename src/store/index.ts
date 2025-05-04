import { configureStore } from '@reduxjs/toolkit'

import bananasReducer from './slices/bananasSlice'
import levelsReducer from './slices/levelsSlice'
import marketReducer from './slices/marketSlice'

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
    bananas: bananasReducer,
    market: marketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
