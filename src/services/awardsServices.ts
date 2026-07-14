import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Store } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@store/index'
import {
  AwardsState,
  createInitialAwardsState,
  setAllAwards,
} from '@store/slices/awardsSlice'

const STORAGE_KEY = 'awards_state'

const isValidAwardsState = (value: unknown): value is AwardsState =>
  !!value && typeof value === 'object'

const loadPersistedAwards = async (): Promise<AwardsState> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return createInitialAwardsState()
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!isValidAwardsState(parsed)) {
      return createInitialAwardsState()
    }
    return { ...createInitialAwardsState(), ...(parsed as AwardsState) }
  } catch {
    return createInitialAwardsState()
  }
}

const savePersistedAwards = async (data: AwardsState) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))

const hydrateAwards = () => async (dispatch: AppDispatch) => {
  const persisted = await loadPersistedAwards()
  dispatch(setAllAwards(persisted))
}
const setupAwardsPersistence = (store: Store<RootState>) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastSerialized = ''

  store.subscribe(() => {
    const awards = store.getState().awards
    const serialized = JSON.stringify(awards)

    if (serialized === lastSerialized) {
      return
    }
    lastSerialized = serialized

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      savePersistedAwards(awards).catch(() => {})
    }, 250)
  })
}

export const awardsService = {
  hydrateAwards,
  setupAwardsPersistence,
}
