import { STREAK_CALENDAR_DAYS } from '@constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppDispatch } from '@store/index'
import {
  createInitialActivityState,
  DayEntry,
  getLastAchievedDay,
  makeResetToFirstDay,
  markRewardClaimedForDay,
  setAllActivity,
  setDays,
  setLastCheckAt,
  setWelcomeBonusClaimed,
  UserActivityState,
} from '@store/slices/userActivitySlice'

const STORAGE_KEY = 'user_activity'
const hoursInDay = 24
const hoursInTwoDays = 2 * hoursInDay

const now = () => new Date()
const toISO = (d: Date) => d.toISOString()
const startOfTodayLocal = (): Date => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  return currentDate
}

const calculateHoursDifference = (fromISO: string, to: Date): number => {
  const from = new Date(fromISO)
  return (to.getTime() - from.getTime()) / (1000 * 60 * 60)
}
const clampToRange = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max)

const loadPersistedActivity = async (): Promise<UserActivityState | null> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    const parsed = JSON.parse(raw) as UserActivityState
    if (
      !Array.isArray(parsed.days) ||
      parsed.days.length !== STREAK_CALENDAR_DAYS
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

const savePersisted = async (data: UserActivityState) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))

export const userActivityService = {
  async initUserActivity(dispatch: AppDispatch) {
    const persisted = await loadPersistedActivity()
    if (persisted) {
      dispatch(setAllActivity(persisted))
    } else {
      const initial = createInitialActivityState()
      await savePersisted(initial)
      dispatch(setAllActivity(initial))
    }
  },

  async setWelcomeBonus(dispatch: AppDispatch, claimed: boolean) {
    const persisted =
      (await loadPersistedActivity()) ?? createInitialActivityState()
    persisted.welcomeBonusClaimed = claimed
    await savePersisted(persisted)
    dispatch(setWelcomeBonusClaimed(claimed))
  },

  async reset(dispatch: AppDispatch) {
    const initial = createInitialActivityState()
    await savePersisted(initial)
    dispatch(setAllActivity(initial))
  },

  async resetStreakToFirstDay(dispatch: AppDispatch) {
    const persisted =
      (await loadPersistedActivity()) ?? createInitialActivityState()
    persisted.days = makeResetToFirstDay()
    persisted.lastCheckAt = toISO(startOfTodayLocal())
    await savePersisted(persisted)
    dispatch(setDays(persisted.days))
    dispatch(setLastCheckAt(persisted.lastCheckAt))
  },

  async checkAndUpdateOnAppStart(
    dispatch: AppDispatch,
    onReward?: (achievedDay: number) => void
  ) {
    const persisted =
      (await loadPersistedActivity()) ?? createInitialActivityState()

    const validatedLastCheckAt =
      persisted.lastCheckAt && !Number.isNaN(Date.parse(persisted.lastCheckAt))
        ? persisted.lastCheckAt
        : null

    const hoursDifference = validatedLastCheckAt
      ? calculateHoursDifference(validatedLastCheckAt, now())
      : hoursInTwoDays + 1

    if (hoursDifference > hoursInTwoDays) {
      persisted.days = makeResetToFirstDay()
      persisted.lastCheckAt = toISO(startOfTodayLocal())
      await savePersisted(persisted)
      dispatch(setDays(persisted.days))
      dispatch(setLastCheckAt(persisted.lastCheckAt))
      onReward?.(1)
      return
    }

    if (hoursDifference < hoursInDay) {
      return
    }
    const lastAchieved = getLastAchievedDay(persisted.days)
    let nextDay = lastAchieved ? lastAchieved + 1 : 1
    if (nextDay > STREAK_CALENDAR_DAYS) {
      nextDay = 1
      persisted.days = makeResetToFirstDay()
    } else {
      const idx = clampToRange(nextDay - 1, 0, STREAK_CALENDAR_DAYS - 1)
      if (persisted.days[idx]) {
        persisted.days[idx].achieved = true
        persisted.days[idx].rewardClaimed = false
      }
    }

    persisted.lastCheckAt = toISO(startOfTodayLocal())
    await savePersisted(persisted)
    dispatch(setDays(persisted.days))
    dispatch(setLastCheckAt(persisted.lastCheckAt))
    onReward?.(nextDay)
  },

  async setDaysDirect(dispatch: AppDispatch, days: Array<DayEntry>) {
    const persisted =
      (await loadPersistedActivity()) ?? createInitialActivityState()
    persisted.days = days
    await savePersisted(persisted)
    dispatch(setDays(days))
  },

  async setLastCheckDate(dispatch: AppDispatch, isoOrNull: string | null) {
    const persisted =
      (await loadPersistedActivity()) ?? createInitialActivityState()
    persisted.lastCheckAt = isoOrNull
    await savePersisted(persisted)
    dispatch(setLastCheckAt(isoOrNull))
  },
  async claimRewardForDay(dispatch: AppDispatch, day: number) {
    const persisted =
      (await loadPersistedActivity()) ?? createInitialActivityState()

    const idx = persisted.days.findIndex((d) => d.day === day)
    if (idx === -1) {
      return
    }

    const entryDay = persisted.days[idx]

    if (!entryDay?.achieved || entryDay.rewardClaimed) {
      return
    }

    entryDay.rewardClaimed = true

    await savePersisted(persisted)
    dispatch(markRewardClaimedForDay(day))
  },
  async forceNextDayForTesting(
    dispatch: AppDispatch,
    onReward?: (achievedDay: number) => void
  ) {
    const persisted =
      (await loadPersistedActivity()) ?? createInitialActivityState()

    const lastAchieved = getLastAchievedDay(persisted.days)
    let nextDay = lastAchieved ? lastAchieved + 1 : 1

    if (nextDay > STREAK_CALENDAR_DAYS) {
      nextDay = 1
      persisted.days = makeResetToFirstDay()
    } else {
      const idx = clampToRange(nextDay - 1, 0, STREAK_CALENDAR_DAYS - 1)
      if (persisted.days[idx]) {
        persisted.days[idx].achieved = true
        persisted.days[idx].rewardClaimed = false
      }
    }

    persisted.lastCheckAt = toISO(startOfTodayLocal())

    await savePersisted(persisted)
    dispatch(setDays(persisted.days))
    dispatch(setLastCheckAt(persisted.lastCheckAt))

    onReward?.(nextDay)
  },
}
