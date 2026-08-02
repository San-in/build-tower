import { OPERATOR } from '@types'

import { generateRandomOperator } from '../generateRandomOperator'

// All valid glyphs, pulled from the enum so the test tracks the source of truth.
const ALL_OPERATORS = Object.values(OPERATOR)

/**
 * generateRandomOperator(exceptions?) returns a random OPERATOR from a weighted
 * pool (Plus/Minus appear twice → more likely). `exceptions` are filtered out;
 * if that empties the pool it falls back to Plus.
 *
 * Note we deliberately DON'T test the weighting/distribution — that's flaky and
 * ties tests to tuning. We test the CONTRACT: valid result, respects
 * exclusions, safe fallback.
 */
describe('generateRandomOperator', () => {
  afterEach(() => jest.restoreAllMocks())

  describe('contract over many iterations', () => {
    it('always returns a valid OPERATOR', () => {
      for (let i = 0; i < 1000; i++) {
        expect(ALL_OPERATORS).toContain(generateRandomOperator())
      }
    })

    it('never returns an excluded operator', () => {
      const exceptions = [OPERATOR.Plus, OPERATOR.Minus]
      for (let i = 0; i < 1000; i++) {
        const op = generateRandomOperator(exceptions)
        expect(exceptions).not.toContain(op)
        expect([OPERATOR.Division, OPERATOR.Multiply]).toContain(op)
      }
    })
  })

  describe('deterministic via mocked Math.random', () => {
    it('random = 0, no exceptions → first pooled operator (Plus)', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0)
      expect(generateRandomOperator()).toBe(OPERATOR.Plus)
    })

    it('random = 0, Plus excluded → first remaining operator (Minus)', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0)
      // remaining pool = [Minus, Minus, Division, Multiply] → index 0 → Minus
      expect(generateRandomOperator([OPERATOR.Plus])).toBe(OPERATOR.Minus)
    })
  })

  // REGRESSION GUARD: excluding every operator empties the pool. It must fall
  // back to a valid operator (Plus), not return undefined / crash.
  it('falls back to Plus when ALL operators are excluded', () => {
    expect(generateRandomOperator(ALL_OPERATORS)).toBe(OPERATOR.Plus)
  })
})
