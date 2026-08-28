import { HOURS_IN_DAY, STREAK_CALENDAR_DAYS } from '@constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@store/index'

export type DayEntry = {
  day: number
  achieved: boolean
  rewardClaimed: boolean
}

export interface UserActivityState {
  welcomeBonusClaimed: boolean
  days: Array<DayEntry>
  lastCheckAt: string | null
  ratePromptShownLevels: Array<number>
}

const now = () => new Date()
const toISO = (date: Date) => date.toISOString()

export const getLastAchievedDay = (days: Array<DayEntry>): number => {
  let lastAchieved = 0

  for (let i = 0; i < days.length; i++) {
    if (days[i]?.achieved) {
      lastAchieved = days[i]?.day || 0
    } else {
      break
    }
  }

  return lastAchieved
}

export const makeDefaultDays = (): Array<DayEntry> =>
  Array.from({ length: STREAK_CALENDAR_DAYS }, (_, i) => ({
    day: i + 1,
    achieved: false,
    rewardClaimed: false,
  }))

export const makeResetToFirstDay = (): Array<DayEntry> => {
  const days = makeDefaultDays()
  if (days[0]) {
    days[0].achieved = true
  }
  return days
}

export const createInitialActivityState = (): UserActivityState => ({
  welcomeBonusClaimed: false,
  days: makeDefaultDays(),
  lastCheckAt: null,
  ratePromptShownLevels: [],
})

const initialState: UserActivityState = createInitialActivityState()

const userActivitySlice = createSlice({
  name: 'userActivity',
  initialState,
  reducers: {
    setWelcomeBonusClaimed: (state, { payload }: PayloadAction<boolean>) => {
      state.welcomeBonusClaimed = payload
    },
    setAllActivity: (_, { payload }: PayloadAction<UserActivityState>) =>
      payload,
    resetActivityToDefault: () => createInitialActivityState(),

    applyStreakUpdate: (
      state,
      {
        payload,
      }: PayloadAction<{ days: Array<DayEntry>; lastCheckAt: string | null }>
    ) => {
      state.days = payload.days
      state.lastCheckAt = payload.lastCheckAt
    },

    markRewardClaimedForDay: (state, { payload }: PayloadAction<number>) => {
      const day = state.days.find((currentDay) => currentDay.day === payload)
      if (!day?.achieved || day.rewardClaimed) {
        return
      }
      day.rewardClaimed = true
    },

    markRatePromptShown: (state, { payload }: PayloadAction<number>) => {
      if (!state.ratePromptShownLevels.includes(payload)) {
        state.ratePromptShownLevels.push(payload)
      }
    },
  },
})

export const {
  setWelcomeBonusClaimed,
  setAllActivity,
  resetActivityToDefault,
  applyStreakUpdate,
  markRewardClaimedForDay,
  markRatePromptShown,
} = userActivitySlice.actions

export default userActivitySlice.reducer

export const selectUserActivity = (state: RootState) => state.userActivity

export const selectLastAchievedDayFromState = (state: RootState) =>
  getLastAchievedDay(state.userActivity.days)

export const selectDayInfoByDay = (day: number) => (state: RootState) =>
  state.userActivity.days.find((dayItem) => dayItem.day === day) ?? null

export const selectIsHasUnclaimedRewards = (state: RootState) =>
  state.userActivity.days.some(
    (dayItem) => dayItem.achieved && !dayItem.rewardClaimed
  )

export const selectWelcomeBonusClaimed = (state: RootState) =>
  state.userActivity.welcomeBonusClaimed

export const selectHasRatePromptShownForLevel =
  (level: number) => (state: RootState) =>
    state.userActivity.ratePromptShownLevels.includes(level)

const calculateHoursDifference = (fromISO: string, to: Date): number => {
  const from = new Date(fromISO)
  return (to.getTime() - from.getTime()) / (1000 * 60 * 60)
}

const clampToRange = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max)

const applyNextDayUpdate = (
  dispatch: AppDispatch,
  state: UserActivityState,
  onReward?: (achievedDay: number) => void
) => {
  const nowISO = toISO(now())
  const days = state.days.map((d) => ({ ...d }))

  const lastAchieved = getLastAchievedDay(days)
  let nextDay = lastAchieved ? lastAchieved + 1 : 1

  if (nextDay > STREAK_CALENDAR_DAYS) {
    nextDay = 1
    dispatch(
      applyStreakUpdate({
        days: makeResetToFirstDay(),
        lastCheckAt: nowISO,
      })
    )
    onReward?.(nextDay)
    return
  }

  const idx = clampToRange(nextDay - 1, 0, STREAK_CALENDAR_DAYS - 1)
  if (days[idx]) {
    days[idx].achieved = true
    days[idx].rewardClaimed = false
  }

  dispatch(
    applyStreakUpdate({
      days,
      lastCheckAt: nowISO,
    })
  )
  onReward?.(nextDay)
}

export const resetStreakToFirstDay = () => (dispatch: AppDispatch) => {
  dispatch(
    applyStreakUpdate({
      days: makeResetToFirstDay(),
      lastCheckAt: toISO(now()),
    })
  )
}

export const checkAndUpdateOnAppStart =
  (onReward?: (achievedDay: number) => void) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().userActivity

    const validatedLastCheckAt =
      state.lastCheckAt && !Number.isNaN(Date.parse(state.lastCheckAt))
        ? state.lastCheckAt
        : null

    const hoursDifference = validatedLastCheckAt
      ? calculateHoursDifference(validatedLastCheckAt, now())
      : HOURS_IN_DAY * 2 + 1

    if (hoursDifference > HOURS_IN_DAY * 2) {
      dispatch(
        applyStreakUpdate({
          days: makeResetToFirstDay(),
          lastCheckAt: toISO(now()),
        })
      )
      onReward?.(1)
      return
    }

    if (hoursDifference < HOURS_IN_DAY) {
      return
    }

    applyNextDayUpdate(dispatch, state, onReward)
  }

export const forceNextDayForTesting =
  (onReward?: (achievedDay: number) => void) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().userActivity
    applyNextDayUpdate(dispatch, state, onReward)
  }
