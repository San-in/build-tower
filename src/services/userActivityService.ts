import { STREAK_CALENDAR_DAYS } from '@constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Store } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@store/index'
import {
  createInitialActivityState,
  setAllActivity,
  UserActivityState,
} from '@store/slices/userActivitySlice'

export const USER_ACTIVITY_STORAGE_KEY = 'user_activity'
const STORAGE_KEY = USER_ACTIVITY_STORAGE_KEY

const isValidUserActivity = (value: unknown): value is UserActivityState => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const x = value as UserActivityState
  return Array.isArray(x.days) && x.days.length === STREAK_CALENDAR_DAYS
}

const loadPersisted = async (): Promise<UserActivityState> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return createInitialActivityState()
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    return isValidUserActivity(parsed)
      ? { ...createInitialActivityState(), ...(parsed as UserActivityState) }
      : createInitialActivityState()
  } catch {
    return createInitialActivityState()
  }
}

const savePersisted = async (data: UserActivityState) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))

export const hydrateUserActivity = () => async (dispatch: AppDispatch) => {
  const persisted = await loadPersisted()
  dispatch(setAllActivity(persisted))
}

export const setupUserActivityPersistence = (store: Store<RootState>) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastPersisted = store.getState().userActivity

  store.subscribe(() => {
    const ua = store.getState().userActivity

    if (ua === lastPersisted) {
      return
    }
    lastPersisted = ua
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      savePersisted(ua).catch(() => {})
    }, 250)
  })
}

export const userActivityService = {
  hydrateUserActivity,
  setupUserActivityPersistence,
}
