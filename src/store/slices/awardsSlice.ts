import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'

import {
  AWARD_TYPE,
  AwardConfig,
  reachAwardsConditions,
} from '../../screens/WelcomeScreen/components/ActivityModal/components/AwardsContent/config'

export type AwardLevelState = {
  isAvailable: boolean
  isPrizeClaimed: boolean
}

export type SingleAwardState = {
  type: AWARD_TYPE
  currentLevel: number
  currentRepeats: number
  levelsInfo: Record<number, AwardLevelState>
}

export type AwardsState = Record<AWARD_TYPE, SingleAwardState>

const getAwardConfigByType = (type: AWARD_TYPE): AwardConfig | undefined =>
  reachAwardsConditions.find((config) => config.type === type)

const makeDefaultLevelsInfo = (
  config: AwardConfig
): Record<number, AwardLevelState> =>
  Object.keys(config.levelConditions).reduce<Record<number, AwardLevelState>>(
    (acc, levelKey) => {
      const level = Number(levelKey)
      acc[level] = { isAvailable: false, isPrizeClaimed: false }
      return acc
    },
    {}
  )

export const createInitialAwardsState = (): AwardsState =>
  reachAwardsConditions.reduce<AwardsState>((acc, config) => {
    acc[config.type] = {
      type: config.type,
      currentLevel: 0,
      currentRepeats: 0,
      levelsInfo: makeDefaultLevelsInfo(config),
    }
    return acc
  }, {} as AwardsState)

const initialState: AwardsState = createInitialAwardsState()

const awardsSlice = createSlice({
  name: 'awards',
  initialState,
  reducers: {
    setAllAwards: (_, { payload }: PayloadAction<AwardsState>) => payload,
    resetAwardsToDefault: () => createInitialAwardsState(),
    increaseRepeatsForAward: (
      state,
      { payload: type }: PayloadAction<AWARD_TYPE>
    ) => {
      const awardState = state[type]
      const config = getAwardConfigByType(type)

      if (!awardState || !config) {
        return
      }
      if (awardState.currentLevel >= config.maxLevel) {
        return
      }

      awardState.currentRepeats += 1

      const nextLevel = awardState.currentLevel + 1
      const condition = config.levelConditions[nextLevel]
      if (!condition) {
        return
      }

      if (awardState.currentRepeats >= condition.targetRepeats) {
        const levelInfo = awardState.levelsInfo[nextLevel]
        if (levelInfo) {
          levelInfo.isAvailable = true
        }
        awardState.currentLevel = nextLevel
      }
    },
    setPrizeClaimed: (
      state,
      { payload }: PayloadAction<{ type: AWARD_TYPE; level: number }>
    ) => {
      const award = state[payload.type]
      if (!award) {
        return
      }

      const levelInfo = award.levelsInfo[payload.level]
      if (!levelInfo) {
        return
      }

      if (!levelInfo.isAvailable || levelInfo.isPrizeClaimed) {
        return
      }
      levelInfo.isPrizeClaimed = true
    },
  },
})

export const {
  setAllAwards,
  resetAwardsToDefault,
  increaseRepeatsForAward,
  setPrizeClaimed,
} = awardsSlice.actions

export default awardsSlice.reducer

export const selectAwardsState = (state: RootState) => state.awards

export const selectAwardCurrentRepeats = (
  state: RootState,
  type: AWARD_TYPE
): number => state.awards[type].currentRepeats

export const selectAwardsDetails = createSelector(
  [selectAwardsState],
  (awards) =>
    reachAwardsConditions.map((config) => ({
      config,
      progress: awards[config.type],
    }))
)

export const selectAwardsWithUnclaimedPrizes = createSelector(
  [selectAwardsState],
  (awards): Array<AWARD_TYPE> => {
    const res: Array<AWARD_TYPE> = []
    for (const award of Object.values(awards)) {
      for (const info of Object.values(award.levelsInfo)) {
        if (info.isAvailable && !info.isPrizeClaimed) {
          res.push(award.type)
          break
        }
      }
    }
    return res
  }
)

export const selectIsHasUnclaimedAwards = createSelector(
  [selectAwardsWithUnclaimedPrizes],
  (types) => types.length > 0
)
