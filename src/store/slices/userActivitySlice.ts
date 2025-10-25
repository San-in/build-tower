import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DayEntry = {
  day: number
  achieved: boolean
}

export interface UserActivityState {
  welcomeBonusClaimed: boolean
  days: Array<DayEntry>
  lastCheckAt: string | null
}

export const STREAK_DAYS = 14

export const makeDefaultDays = (): Array<DayEntry> =>
  Array.from({ length: STREAK_DAYS }, (_, i) => ({
    day: i + 1,
    achieved: false,
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
  },
})

export const {
  setWelcomeBonusClaimed,
  setAllActivity,
  resetActivityToDefault,
  setLastCheckAt,
  setDays,
} = userActivitySlice.actions

export default userActivitySlice.reducer
