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

// Awards whose max level unlocks POWER_UP_MASTER.
const POWER_UP_MASTER_SOURCES: Array<AWARD_TYPE> = [
  AWARD_TYPE.ADD_BLOCKS_MASTER,
  AWARD_TYPE.REMOVE_BLOCKS_MASTER,
  AWARD_TYPE.ADD_EXTRA_STEP_MASTER,
]

const isAwardMaxed = (state: AwardsState, type: AWARD_TYPE): boolean => {
  const award = state[type]
  const config = getAwardConfigByType(type)
  return Boolean(award && config && award.currentLevel >= config.maxLevel)
}

// Unlocks a single-level derived award (maxLevel === 1) once, when qualified.
const unlockDerivedAward = (
  state: AwardsState,
  type: AWARD_TYPE,
  isQualified: boolean
) => {
  const award = state[type]
  if (!award || award.currentLevel >= 1 || !isQualified) {
    return
  }
  award.currentRepeats = 1
  award.currentLevel = 1
  const levelInfo = award.levelsInfo[1]
  if (levelInfo) {
    levelInfo.isAvailable = true
  }
}

// Derived awards are not counted manually — they unlock when other awards are
// maxed. Must run POWER_UP_MASTER first so it counts toward AWARDS_COLLECTIONER.
const syncDerivedAwards = (state: AwardsState) => {
  unlockDerivedAward(
    state,
    AWARD_TYPE.POWER_UP_MASTER,
    POWER_UP_MASTER_SOURCES.every((type) => isAwardMaxed(state, type))
  )

  const allOtherAwardsMaxed = reachAwardsConditions
    .filter((config) => config.type !== AWARD_TYPE.AWARDS_COLLECTIONER)
    .every((config) => isAwardMaxed(state, config.type))
  unlockDerivedAward(
    state,
    AWARD_TYPE.AWARDS_COLLECTIONER,
    allOtherAwardsMaxed
  )
}

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

      if (awardState && config && awardState.currentLevel < config.maxLevel) {
        awardState.currentRepeats += 1

        const nextLevel = awardState.currentLevel + 1
        const condition = config.levelConditions[nextLevel]

        if (condition && awardState.currentRepeats >= condition.targetRepeats) {
          const levelInfo = awardState.levelsInfo[nextLevel]
          if (levelInfo) {
            levelInfo.isAvailable = true
          }
          awardState.currentLevel = nextLevel
        }
      }

      // Maxing a source award may unlock a derived one in the same dispatch.
      syncDerivedAwards(state)
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

const awardHasUnclaimedPrize = (award: SingleAwardState): boolean =>
  Object.values(award.levelsInfo).some(
    (info) => info.isAvailable && !info.isPrizeClaimed
  )

export const selectAwardsDetails = createSelector(
  [selectAwardsState],
  (awards) =>
    reachAwardsConditions.map((config) => ({
      config,
      progress: awards[config.type],
      hasUnclaimedPrize: awardHasUnclaimedPrize(awards[config.type]),
    }))
)

export const selectAwardsWithUnclaimedPrizes = createSelector(
  [selectAwardsState],
  (awards): Array<AWARD_TYPE> =>
    Object.values(awards)
      .filter(awardHasUnclaimedPrize)
      .map((award) => award.type)
)

export const selectIsHasUnclaimedAwards = createSelector(
  [selectAwardsWithUnclaimedPrizes],
  (types) => types.length > 0
)
