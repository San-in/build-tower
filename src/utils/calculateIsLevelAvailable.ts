import { Level } from '@store/slices/levelsSlice'
import { LEVEL_DIFFICULTY } from '@types'

const REQUIRED_STARS: Record<LEVEL_DIFFICULTY, number> = {
  [LEVEL_DIFFICULTY.Easy]: 1,
  [LEVEL_DIFFICULTY.Medium]: 2,
  [LEVEL_DIFFICULTY.Hard]: 3,
}

export const calculateIsLevelAvailable = (
  levels: Array<Level>,
  levelId: number
): boolean => {
  const level = levels.find((lvl) => lvl.id === levelId)
  if (!level) {
    return false
  }

  const previousLevel = levels.find((lvl) => lvl.id === levelId - 1)
  if (!previousLevel) {
    return true
  }

  return previousLevel.stars >= REQUIRED_STARS[level.difficulty]
}
