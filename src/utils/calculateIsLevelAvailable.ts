import { Level } from '@store/slices/levelsSlice'
import { LEVEL_DIFFICULTY } from '@types'

export const calculateIsLevelAvailable = (
  levels: Array<Level>,
  levelId: number
): boolean => {
  const level = levels.find((lvl) => lvl.id === levelId)
  if (!level) {return false}

  const requiredStars = {
    [LEVEL_DIFFICULTY.Easy]: 1,
    [LEVEL_DIFFICULTY.Medium]: 2,
    [LEVEL_DIFFICULTY.Hard]: 3,
  }[level.difficulty]

  const previousLevels = levels.filter((lvl) => lvl.id < levelId)

  return previousLevels.every((lvl) => lvl.stars >= requiredStars)
}
