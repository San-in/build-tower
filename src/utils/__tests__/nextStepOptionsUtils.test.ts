import { OPERATOR } from '@types'

import {
  getOptionNumberByOperator,
  getOptionOperators,
  getValidOptionNumber,
  showIsUserNeedHelp,
} from '../nextStepOptionsUtils'

const ALL_OPERATORS = Object.values(OPERATOR)

/**
 * The "rubber-banding" helpers that build the two option cards each step.
 * showIsUserNeedHelp + getValidOptionNumber are PURE → example/boundary tests.
 * getOptionOperators + getOptionNumberByOperator use RNG internally → we fall
 * back to the same two strategies as the RNG utils: contract-over-iterations,
 * plus deterministic assertions on the branches that don't depend on chance.
 */
describe('showIsUserNeedHelp', () => {
  // Positive target (init = 10). Thresholds, relative to the target:
  //   help                  : overshoot by more than half the target (>15)
  //   strongHelp            : overshoot by more than a full target   (>20)
  //   isMultipleBlocked     : ratio in [2, 4)  → userBlocks in [20, 40)
  //   isMultiplePlusBlocked : ratio >= 4       → userBlocks >= 40
  describe('with a positive target (init = 10)', () => {
    it.each([
      // userBlocks, help,  strong, multBlocked, multPlusBlocked
      [3, false, false, false, false],
      [15, false, false, false, false], // boundary: diff 5 is NOT > 5
      [16, true, false, false, false], // diff 6 > 5
      [20, true, false, true, false], // ratio exactly 2 → blocked
      [21, true, true, true, false], // diff 11 > 10
      [39, true, true, true, false], // ratio 3.9
      [40, true, true, false, true], // ratio exactly 4 → plus-blocked
    ])(
      'userBlocks=%i',
      (userBlocks, help, strongHelp, isMultipleBlocked, isMultiplePlusBlocked) => {
        expect(showIsUserNeedHelp(userBlocks, 10)).toEqual({
          help,
          strongHelp,
          isMultipleBlocked,
          isMultiplePlusBlocked,
        })
      }
    )
  })

  // Guard branch: init <= 0 short-circuits BEFORE computing `ratio`, which would
  // otherwise divide by zero (Infinity/NaN). Pinning the safe behavior.
  describe('with a non-positive target (divide-by-zero guard)', () => {
    it('flags help when the user has blocks over a <= 0 target', () => {
      expect(showIsUserNeedHelp(5, 0)).toEqual({
        help: true,
        strongHelp: true,
        isMultipleBlocked: false,
        isMultiplePlusBlocked: true,
      })
    })

    it('flags nothing when the user also has 0', () => {
      expect(showIsUserNeedHelp(0, 0)).toEqual({
        help: false,
        strongHelp: false,
        isMultipleBlocked: false,
        isMultiplePlusBlocked: false,
      })
    })
  })
})

describe('getOptionOperators', () => {
  it('always returns two valid operators', () => {
    for (let i = 0; i < 200; i++) {
      const [first, second] = getOptionOperators(false, false, false, false)
      expect(ALL_OPERATORS).toContain(first)
      expect(ALL_OPERATORS).toContain(second)
    }
  })

  it('never offers Minus / Division as the first op on the last block', () => {
    for (let i = 0; i < 200; i++) {
      const [first] = getOptionOperators(true, false, false, false)
      expect([OPERATOR.Minus, OPERATOR.Division]).not.toContain(first)
    }
  })

  it('never offers Multiply / Plus as first when multiple-plus is blocked', () => {
    for (let i = 0; i < 200; i++) {
      const [first] = getOptionOperators(false, false, false, true)
      expect([OPERATOR.Multiply, OPERATOR.Plus]).not.toContain(first)
    }
  })

  // When the combined flags exclude EVERY operator for `first`, the underlying
  // generateRandomOperator falls back to Plus — deterministic, so no loop needed.
  // (last block excludes Minus/Division, multiple-plus excludes Multiply/Plus.)
  it('falls back to Plus for first when all operators are excluded', () => {
    const [first] = getOptionOperators(true, false, false, true)
    expect(first).toBe(OPERATOR.Plus)
  })
})

describe('getValidOptionNumber', () => {
  it('caps Minus at totalNumbers - 1 so at least one block survives', () => {
    expect(
      getValidOptionNumber({
        operator: OPERATOR.Minus,
        number: 5,
        totalNumbers: 5,
      })
    ).toBe(4)
    expect(
      getValidOptionNumber({
        operator: OPERATOR.Minus,
        number: 9,
        totalNumbers: 5,
      })
    ).toBe(4)
  })

  it('leaves a Minus that stays below the total untouched', () => {
    expect(
      getValidOptionNumber({
        operator: OPERATOR.Minus,
        number: 3,
        totalNumbers: 5,
      })
    ).toBe(3)
  })

  it('never caps a non-Minus operator', () => {
    expect(
      getValidOptionNumber({
        operator: OPERATOR.Multiply,
        number: 9,
        totalNumbers: 5,
      })
    ).toBe(9)
  })
})

describe('getOptionNumberByOperator', () => {
  const simpleOperators = { start: 1, end: 3 }
  const multiplicativeOperators = { start: 2, end: 5 }

  it('draws from the SIMPLE range for + / - operators', () => {
    for (let i = 0; i < 200; i++) {
      const n = getOptionNumberByOperator({
        operator: OPERATOR.Plus,
        simpleOperators,
        multiplicativeOperators,
      })
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(3)
    }
  })

  it('draws from the MULTIPLICATIVE range for x / ÷ operators', () => {
    for (let i = 0; i < 200; i++) {
      const n = getOptionNumberByOperator({
        operator: OPERATOR.Multiply,
        simpleOperators,
        multiplicativeOperators,
      })
      expect(n).toBeGreaterThanOrEqual(2)
      expect(n).toBeLessThanOrEqual(5)
    }
  })
})
