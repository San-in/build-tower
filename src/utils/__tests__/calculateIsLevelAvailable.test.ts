import type { Level } from '@store/slices/levelsSlice'
import { LEVEL_DIFFICULTY } from '@types'

import { calculateIsLevelAvailable } from '../calculateIsLevelAvailable'

/**
 * calculateIsLevelAvailable(levels, levelId) decides whether a level is
 * unlocked. Rules:
 *   - unknown level id            → false
 *   - no previous level (id-1)    → true (first level is always open)
 *   - otherwise the IMMEDIATELY preceding level must have enough stars, where
 *     "enough" depends on the TARGET level's difficulty: Easy 1 / Medium 2 / Hard 3.
 *
 * `Level` is imported as a TYPE only (`import type`) so the test never pulls the
 * real store slice (and its AsyncStorage setup) into Jest.
 */
const makeLevel = (
  id: number,
  stars: number,
  difficulty: LEVEL_DIFFICULTY
): Level => ({
  id: id as Level['id'],
  stars: stars as Level['stars'],
  isAvailable: false,
  difficulty,
})

describe('calculateIsLevelAvailable', () => {
  it('returns false when the level id is not in the list', () => {
    expect(calculateIsLevelAvailable([], 5)).toBe(false)
  })

  it('returns true for the first level (no predecessor exists)', () => {
    const levels = [makeLevel(1, 0, LEVEL_DIFFICULTY.Easy)]
    expect(calculateIsLevelAvailable(levels, 1)).toBe(true)
  })

  // The required-stars threshold is keyed off the TARGET level's difficulty and
  // compared against the PREDECESSOR's stars. Boundary rows: exactly-enough vs
  // one-short.
  describe('gates on the predecessor stars by target difficulty', () => {
    it.each([
      [LEVEL_DIFFICULTY.Easy, 1, true],
      [LEVEL_DIFFICULTY.Easy, 0, false],
      [LEVEL_DIFFICULTY.Medium, 2, true],
      [LEVEL_DIFFICULTY.Medium, 1, false],
      [LEVEL_DIFFICULTY.Hard, 3, true],
      [LEVEL_DIFFICULTY.Hard, 2, false],
    ])(
      '%s target, predecessor has %i stars → %s',
      (difficulty, predecessorStars, expected) => {
        const levels = [
          makeLevel(1, predecessorStars, LEVEL_DIFFICULTY.Easy),
          makeLevel(2, 0, difficulty),
        ]
        expect(calculateIsLevelAvailable(levels, 2)).toBe(expected)
      }
    )
  })

  // REGRESSION GUARD: the gate must look ONLY at the immediate predecessor
  // (id-1), not at every earlier level. Old bug demanded stars on ALL prior
  // levels. Here level 1 has 0 stars but level 2 (the predecessor) has 3, so a
  // Hard level 3 still unlocks.
  it('checks ONLY the immediate predecessor, not all earlier levels', () => {
    const levels = [
      makeLevel(1, 0, LEVEL_DIFFICULTY.Easy),
      makeLevel(2, 3, LEVEL_DIFFICULTY.Easy),
      makeLevel(3, 0, LEVEL_DIFFICULTY.Hard),
    ]
    expect(calculateIsLevelAvailable(levels, 3)).toBe(true)
  })
})
