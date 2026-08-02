import AsyncStorage from '@react-native-async-storage/async-storage'

import { AWARDS_STORAGE_KEY } from './awardsServices'
import { BANANAS_STORAGE_KEY } from './bananasServices'
import { LEVELS_STORAGE_KEY } from './levelsServices'
import { MARKET_STORAGE_KEY } from './marketService'
import { USER_ACTIVITY_STORAGE_KEY } from './userActivityService'

export * from './bananasServices'
export * from './levelsServices'
export * from './marketService'

// Every persisted slice key. Keep in sync with the services above.
export const PERSISTENCE_KEYS = [
  BANANAS_STORAGE_KEY,
  LEVELS_STORAGE_KEY,
  MARKET_STORAGE_KEY,
  AWARDS_STORAGE_KEY,
  USER_ACTIVITY_STORAGE_KEY,
]

// Wipes all persisted state immediately, bypassing the debounced subscribe
// writers. Used by "Reset progress" so a reload right after reset can't
// re-hydrate stale values.
export const clearAllPersistence = () =>
  AsyncStorage.multiRemove(PERSISTENCE_KEYS)
