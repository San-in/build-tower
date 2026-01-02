import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Store } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@store/index'
import { setAllBananas } from '@store/slices/bananasSlice'

const STORAGE_KEY = 'bananas'

const loadBananas = async (): Promise<number> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return 0
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : 0
  } catch {
    return 0
  }
}

const saveBananas = async (value: number) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value))

const hydrateBananas = () => async (dispatch: AppDispatch) => {
  const persisted = await loadBananas()
  dispatch(setAllBananas(persisted))
}

const setupBananasPersistence = (store: Store<RootState>) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastValue: number | null = null

  store.subscribe(() => {
    const value = store.getState().bananas.bananas
    if (value === lastValue) {
      return
    }
    lastValue = value

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      saveBananas(value).catch(() => {})
    }, 200)
  })
}

export const bananasService = {
  hydrateBananas,
  setupBananasPersistence,
}
