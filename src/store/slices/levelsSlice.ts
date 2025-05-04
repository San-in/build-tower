import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LEVEL_DIFFICULTY, LevelId } from '@types'
import { generateInitialLevels } from '@utils'

export type Level = {
  id: LevelId
  stars: 0 | 1 | 2 | 3
  isAvailable: boolean
  difficulty: LEVEL_DIFFICULTY
}

interface LevelsState {
  levels: Array<Level>
}

const initialState: LevelsState = {
  levels: generateInitialLevels(),
}

const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    changeLevelRatingById: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number
        stars: 0 | 1 | 2 | 3
      }>
    ) => {
      const { id, stars } = payload
      const level = state.levels.find((lvl) => lvl.id === id)
      if (level) {
        level.stars = stars
      }
    },
    setAllLevels: (state, { payload }: PayloadAction<Array<Level>>) => {
      state.levels = payload
    },
    resetLevels: () => initialState,
    makeLevelAvailable: (state, { payload }: PayloadAction<{ id: number }>) => {
      const level = state.levels.find((lvl) => lvl.id === payload.id)
      if (level) {
        level.isAvailable = true
      }
    },
  },
})

export const getAllAvailableLevels = createSelector(
  (state: { levels: LevelsState }) => state.levels.levels,
  (levels) => levels.filter((level) => level.isAvailable)
)

const levelByIdSelectorsCache: Record<
  number,
  ReturnType<typeof createSelector>
> = {}

export const getLevelById = (id: number) => {
  if (!levelByIdSelectorsCache[id]) {
    levelByIdSelectorsCache[id] = createSelector(
      (state: { levels: { levels: Array<Level> } }) => state.levels.levels,
      (levels: Array<Level>) => levels.find((level: Level) => level.id === id)
    )
  }
  return levelByIdSelectorsCache[id]
}

export const {
  changeLevelRatingById,
  setAllLevels,
  resetLevels,
  makeLevelAvailable,
} = levelsSlice.actions

export default levelsSlice.reducer
