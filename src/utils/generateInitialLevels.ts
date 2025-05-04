import { TOTAL_LEVELS } from '@constants'
import { Level } from '@store/slices/levelsSlice'
import { LEVEL_DIFFICULTY, LevelId } from '@types'

const getDifficultyByIndex = (index: number): LEVEL_DIFFICULTY => {
  if (index < 10) {
    return LEVEL_DIFFICULTY.Easy
  } else if (index < 20) {
    return LEVEL_DIFFICULTY.Medium
  } else {
    return LEVEL_DIFFICULTY.Hard
  }
}

export const generateInitialLevels = (): Array<Level> =>
  Array.from({ length: TOTAL_LEVELS }, (_, index) => ({
    id: (index + 1) as LevelId,
    stars: 0,
    isAvailable: index === 0,
    difficulty: getDifficultyByIndex(index),
  }))
