import { STREAK_CALENDAR_DAYS } from '@constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'

export type DayEntry = {
  day: number
  achieved: boolean
  rewardClaimed: boolean
}

export interface UserActivityState {
  welcomeBonusClaimed: boolean
  days: Array<DayEntry>
  lastCheckAt: string | null
}

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
})

const initialState: UserActivityState = createInitialActivityState()

const userActivitySlice = createSlice({
  name: 'userActivity',
  initialState,
  reducers: {
    setWelcomeBonusClaimed: (state, { payload }: PayloadAction<boolean>) => {
      state.welcomeBonusClaimed = payload
    },
    setAllActivity: (state, { payload }: PayloadAction<UserActivityState>) => {
      state.welcomeBonusClaimed = payload.welcomeBonusClaimed
      state.days = payload.days
      state.lastCheckAt = payload.lastCheckAt
    },
    resetActivityToDefault: (state) => {
      state.welcomeBonusClaimed = false
      state.days = makeDefaultDays()
      state.lastCheckAt = null
    },
    setLastCheckAt: (state, { payload }: PayloadAction<string | null>) => {
      state.lastCheckAt = payload
    },
    setDays: (state, { payload }: PayloadAction<Array<DayEntry>>) => {
      state.days = payload
    },
    markRewardClaimedForDay: (state, { payload }: PayloadAction<number>) => {
      const dayIdx = state.days.findIndex((d) => d.day === payload)
      if (dayIdx === -1) {
        return
      }
      const day = state.days[dayIdx]
      if (!day?.achieved) {
        return
      }

      day.rewardClaimed = true
    },
  },
})

export const getLastAchievedDayFromState = (state: RootState) =>
  getLastAchievedDay(state.userActivity.days)

export const getDayInfoByDay = (state: RootState, day: number) =>
  state.userActivity.days.find((d) => d.day === day) ?? null

export const getHasUnclaimedRewards = (state: RootState) =>
  state.userActivity.days.some((d) => d.achieved && !d.rewardClaimed)

export const {
  setWelcomeBonusClaimed,
  setAllActivity,
  resetActivityToDefault,
  setLastCheckAt,
  setDays,
  markRewardClaimedForDay,
} = userActivitySlice.actions

export default userActivitySlice.reducer
