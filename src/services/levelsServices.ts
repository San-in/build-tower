import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppDispatch } from '@store/index'
import {
  changeLevelRatingById,
  Level,
  makeLevelAvailable,
  resetLevels,
  setAllLevels,
} from '@store/slices/levelsSlice'
import { Star } from '@types'
import { calculateIsLevelAvailable, generateInitialLevels } from '@utils'

const STORAGE_KEY = 'levels_progress'

export const levelService = {
  async initLevels(dispatch: AppDispatch) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)

    if (raw) {
      const levels: Array<Level> = JSON.parse(raw)
      dispatch(setAllLevels(levels))
    } else {
      const levels = generateInitialLevels()
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
      dispatch(setAllLevels(levels))
    }
  },

  async reset(dispatch: AppDispatch) {
    const initialLevels = generateInitialLevels()
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialLevels))
    dispatch(resetLevels())
  },

  async updateLevelRatingAndUnlockNext(
    dispatch: AppDispatch,
    levelId: number,
    stars: Star
  ) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    let levels: Array<Level> = raw ? JSON.parse(raw) : generateInitialLevels()

    levels = levels.map((level) =>
      level.id === levelId ? { ...level, stars } : level
    )

    const nextLevelId = levelId + 1
    const canUnlockNext = calculateIsLevelAvailable(levels, nextLevelId)

    if (canUnlockNext) {
      levels = levels.map((level) =>
        level.id === nextLevelId ? { ...level, isAvailable: true } : level
      )
      dispatch(makeLevelAvailable({ id: nextLevelId }))
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
    dispatch(changeLevelRatingById({ id: levelId, stars }))
  },
}
