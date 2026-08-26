import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Store } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@store/index'
import { Level, setAllLevels } from '@store/slices/levelsSlice'
import { generateInitialLevels } from '@utils'

export const LEVELS_STORAGE_KEY = 'levels_progress'
const STORAGE_KEY = LEVELS_STORAGE_KEY

const loadPersistedLevels = async (): Promise<Array<Level>> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return generateInitialLevels()
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed)
      ? (parsed as Array<Level>)
      : generateInitialLevels()
  } catch {
    return generateInitialLevels()
  }
}

const savePersistedLevels = async (levels: Array<Level>) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(levels))

const hydrateLevels = () => async (dispatch: AppDispatch) => {
  const persisted = await loadPersistedLevels()
  dispatch(setAllLevels(persisted))
}

const setupLevelsPersistence = (store: Store<RootState>) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastPersisted = store.getState().levels.levels

  store.subscribe(() => {
    const levels = store.getState().levels.levels

    if (levels === lastPersisted) {
      return
    }
    lastPersisted = levels
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      savePersistedLevels(levels).catch(() => {})
    }, 250)
  })
}

export const levelService = {
  hydrateLevels,
  setupLevelsPersistence,
}
