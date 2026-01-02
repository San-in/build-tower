import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import { LEVEL_DIFFICULTY, LevelId, Star } from '@types'
import { calculateIsLevelAvailable, generateInitialLevels } from '@utils'

export type Level = {
  id: LevelId
  stars: Star
  isAvailable: boolean
  difficulty: LEVEL_DIFFICULTY
}
interface LevelsState {
  levels: Array<Level>
}

export const createInitialLevelsState = (): LevelsState => ({
  levels: generateInitialLevels(),
})

const initialState: LevelsState = createInitialLevelsState()

const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    setAllLevels: (state, { payload }: PayloadAction<Array<Level>>) => {
      state.levels = payload
    },

    resetLevels: () => createInitialLevelsState(),
    updateLevelRatingAndUnlockNext: (
      state,
      { payload }: PayloadAction<{ levelId: number; stars: Star }>
    ) => {
      const { levelId, stars } = payload

      const current = state.levels.find((lvl) => lvl.id === levelId)
      if (!current) {
        return
      }
      current.stars = stars

      const nextClosed = state.levels.find((lvl) => !lvl.isAvailable)
      if (!nextClosed) {
        return
      }

      const canUnlock = calculateIsLevelAvailable(state.levels, nextClosed.id)
      if (canUnlock) {
        nextClosed.isAvailable = true
      }
    },

    changeLevelRatingById: (
      state,
      { payload }: PayloadAction<{ id: number; stars: Star }>
    ) => {
      const level = state.levels.find((lvl) => lvl.id === payload.id)
      if (level) {
        level.stars = payload.stars
      }
    },
    makeLevelAvailable: (state, { payload }: PayloadAction<{ id: number }>) => {
      const level = state.levels.find((lvl) => lvl.id === payload.id)
      if (level) {
        level.isAvailable = true
      }
    },
  },
})

export const {
  setAllLevels,
  resetLevels,
  updateLevelRatingAndUnlockNext,
  changeLevelRatingById,
  makeLevelAvailable,
} = levelsSlice.actions

export default levelsSlice.reducer

export const selectLevelById = (id: LevelId) => (state: RootState) =>
  state.levels.levels.find((level: Level) => level.id === id)

const selectLevels = (state: RootState) => state.levels.levels

export const selectAvailableLevels = createSelector([selectLevels], (levels) =>
  levels.filter((level: Level) => level.isAvailable)
)
