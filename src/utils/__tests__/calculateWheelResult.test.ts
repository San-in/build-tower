import { OPERATOR } from '@types'

import { calculateWheelResult } from '../calculateWheelResult'

/**
 * calculateWheelResult applies a wheel sector to a block count. The sector is a
 * string like '+5' / 'x2' / '÷2': the FIRST char is the operator glyph (must
 * match the OPERATOR enum) and the rest is the operand. Rules:
 *   +  → value + operand
 *   -  → value - operand, but never below 1 (clamp)
 *   x  → round(value * operand)
 *   ÷  → round(value / operand), but never below 1 (clamp)
 *   anything else → warn + return value unchanged
 *
 * We build operation strings FROM the enum (`${OPERATOR.Multiply}2`) instead of
 * hardcoding 'x2', so if a glyph ever changes the tests follow it automatically.
 */
describe('calculateWheelResult', () => {
  describe('addition / subtraction', () => {
    it('adds the operand', () => {
      expect(
        calculateWheelResult({ value: 10, operation: `${OPERATOR.Plus}5` })
      ).toBe(15)
    })

    it('subtracts the operand', () => {
      expect(
        calculateWheelResult({ value: 10, operation: `${OPERATOR.Minus}3` })
      ).toBe(7)
    })

    // Clamp: a tower can never drop below 1 block, whichever branch we hit
    // (exactly 1, or would-be negative).
    it.each([
      [3, 2, 1], // 3 - 2 = 1
      [3, 3, 1], // 3 - 3 = 0 → clamped
      [2, 5, 1], // 2 - 5 = -3 → clamped
    ])('never drops below 1: %i - %i → %i', (value, operand, expected) => {
      expect(
        calculateWheelResult({
          value,
          operation: `${OPERATOR.Minus}${operand}`,
        })
      ).toBe(expected)
    })
  })

  describe('multiplication', () => {
    it.each([
      [6, 2, 12],
      [1, 3, 3],
    ])('%i x %i → %i', (value, operand, expected) => {
      expect(
        calculateWheelResult({
          value,
          operation: `${OPERATOR.Multiply}${operand}`,
        })
      ).toBe(expected)
    })
  })

  // Division is the interesting one: results are ROUNDED to whole blocks (you
  // can't have half a block) and clamped to 1. This pins the "round the wheel
  // division/multiply" fix.
  describe('division (rounded to whole blocks, clamped to 1)', () => {
    it.each([
      [5, 2, 3], // 2.5 → 3
      [7, 2, 4], // 3.5 → 4
      [10, 2, 5], // exact
      [10, 3, 3], // 3.33 → 3
      [8, 3, 3], // 2.67 → 3
      [2, 3, 1], // 0.67 → clamped to 1
      [1, 2, 1], // 0.5 → clamped to 1
    ])('%i ÷ %i → %i', (value, operand, expected) => {
      expect(
        calculateWheelResult({
          value,
          operation: `${OPERATOR.Division}${operand}`,
        })
      ).toBe(expected)
    })
  })

  // The "first tower" wheel passes a fixed operator via `defaultOperation` and
  // the sector string is then the WHOLE operand (no leading glyph to strip).
  describe('defaultOperation (operator fixed, whole string is the operand)', () => {
    it('applies the forced operator to the whole string', () => {
      expect(
        calculateWheelResult({
          value: 10,
          operation: '5',
          defaultOperation: OPERATOR.Plus,
        })
      ).toBe(15)
    })
  })

  // REGRESSION GUARD: levels 28-30 once used '*' instead of the 'x' glyph. '*'
  // is not in OPERATOR, so it silently fell through to default and the power-up
  // did NOTHING (value unchanged). We assert BOTH the no-op AND that it warned.
  describe('unsupported operator glyph', () => {
    it('warns and returns the value unchanged for "*"', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})

      expect(calculateWheelResult({ value: 10, operation: '*2' })).toBe(10)
      expect(warn).toHaveBeenCalledTimes(1)

      warn.mockRestore()
    })
  })
})
