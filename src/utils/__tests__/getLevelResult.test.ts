import { LEVEL_RESULT } from '@types'

import { calculateExpectedLevelConditions } from '../calculateExpectedLevelConditions'
import { getLevelResult } from '../getLevelResult'

/**
 * getLevelResult maps the final block count to a medal (or a miss). Boundaries:
 *   value >  gold                    → TooHigh
 *   value === gold                   → Gold
 *   silver <= value < gold           → Silver
 *   bronze <= value < silver         → Bronze
 *   value <  bronze                  → TooLow
 *
 * All the risk here is off-by-one (`>` vs `>=`), so most cases sit EXACTLY on a
 * threshold. A tiny helper keeps each case to just (value → expected).
 */
describe('getLevelResult', () => {
  const at = (userBlockValue: number) =>
    getLevelResult({
      userBlockValue,
      goldResult: 100,
      silverResult: 90,
      bronzeResult: 80,
    })

  describe('with distinct thresholds [gold 100, silver 90, bronze 80]', () => {
    it.each([
      [101, LEVEL_RESULT.TooHigh], // just over gold
      [100, LEVEL_RESULT.GoldResult], // exact gold
      [99, LEVEL_RESULT.SilverResult], // just under gold
      [90, LEVEL_RESULT.SilverResult], // exact silver (lower bound of silver)
      [89, LEVEL_RESULT.BronzeResult], // just under silver
      [80, LEVEL_RESULT.BronzeResult], // exact bronze (lower bound of bronze)
      [79, LEVEL_RESULT.TooLow], // just under bronze
      [0, LEVEL_RESULT.TooLow],
    ])('value %i → %s', (value, expected) => {
      expect(at(value)).toBe(expected)
    })
  })

  // Integration: feed getLevelResult the REAL thresholds that
  // calculateExpectedLevelConditions produces — this is exactly how the game
  // pairs them, so it catches contract mismatches between the two functions.
  describe('fed by calculateExpectedLevelConditions', () => {
    it('classifies an exact match as Gold', () => {
      const [gold = 0, silver = 0, bronze = 0] = calculateExpectedLevelConditions(100)
      expect(
        getLevelResult({
          userBlockValue: gold,
          goldResult: gold,
          silverResult: silver,
          bronzeResult: bronze,
        })
      ).toBe(LEVEL_RESULT.GoldResult)
    })

    // Degenerate thresholds from a tiny target [2,1,1]: silver === bronze === 1.
    // Because the Silver branch is checked first, value 1 resolves to Silver and
    // the Bronze tier becomes unreachable. Documenting the real behavior.
    it('collapses the bronze tier when silver === bronze', () => {
      const [gold = 0, silver = 0, bronze = 0] = calculateExpectedLevelConditions(2) // [2,1,1]
      const params = { goldResult: gold, silverResult: silver, bronzeResult: bronze }

      expect(getLevelResult({ ...params, userBlockValue: 2 })).toBe(
        LEVEL_RESULT.GoldResult
      )
      expect(getLevelResult({ ...params, userBlockValue: 1 })).toBe(
        LEVEL_RESULT.SilverResult
      )
      expect(getLevelResult({ ...params, userBlockValue: 0 })).toBe(
        LEVEL_RESULT.TooLow
      )
    })
  })
})
