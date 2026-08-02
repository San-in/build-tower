import { configureStore } from '@reduxjs/toolkit'
import { bananasService, levelService, marketService } from '@services'

import { awardsService } from '../services/awardsServices'
import { userActivityService } from '../services/userActivityService'
import awardsReducer from './slices/awardsSlice'
import awardsUiReducer from './slices/awardsUiSlice'
import bananasReducer from './slices/bananasSlice'
import levelsReducer from './slices/levelsSlice'
import marketReducer from './slices/marketSlice'
import userActivityReducer from './slices/userActivitySlice'

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
    bananas: bananasReducer,
    market: marketReducer,
    userActivity: userActivityReducer,
    awards: awardsReducer,
    awardsUi: awardsUiReducer,
  },
})
awardsService.setupAwardsPersistence(store)
bananasService.setupBananasPersistence(store)
levelService.setupLevelsPersistence(store)
marketService.setupMarketPersistence(store)
userActivityService.setupUserActivityPersistence(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
