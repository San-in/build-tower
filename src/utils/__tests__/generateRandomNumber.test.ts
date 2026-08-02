import { generateRandomNumber } from '../generateRandomNumber'

/**
 * generateRandomNumber({min,max,exceptions}) picks a random integer in
 * [min,max] excluding `exceptions`. If nothing qualifies (min>max, or all
 * excluded) it falls back to `min`.
 *
 * Randomness can't be asserted with a fixed `.toBe(...)`, so we use TWO
 * complementary strategies — this file demonstrates both.
 */
describe('generateRandomNumber', () => {
  afterEach(() => jest.restoreAllMocks())

  // STRATEGY 1 — don't control randomness, assert the CONTRACT over many runs.
  // Good for "result is always valid": in range, an integer, never excluded.
  // Trade-off: statistical (can't prove an exact value), so use enough iterations.
  describe('contract over many iterations', () => {
    it('always returns an integer in [min,max], never an exception', () => {
      for (let i = 0; i < 1000; i++) {
        const n = generateRandomNumber({ min: 2, max: 8, exceptions: [5] })
        expect(Number.isInteger(n)).toBe(true)
        expect(n).toBeGreaterThanOrEqual(2)
        expect(n).toBeLessThanOrEqual(8)
        expect(n).not.toBe(5)
      }
    })
  })

  // STRATEGY 2 — MOCK the randomness source so the function becomes
  // deterministic and we can assert an EXACT value / hit a SPECIFIC branch.
  // random→0 selects index 0 (first candidate); random→~1 selects the last.
  // Trade-off: couples the test to the impl (that it indexes via Math.random).
  describe('deterministic via mocked Math.random', () => {
    it('random = 0 → first candidate (min)', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0)
      expect(generateRandomNumber({ min: 3, max: 6 })).toBe(3)
    })

    it('random ≈ 1 → last candidate (max)', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.9999)
      expect(generateRandomNumber({ min: 3, max: 6 })).toBe(6)
    })

    it('indexes the candidate list AFTER exclusions are removed', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0)
      // candidates are [3,4,5] (1 and 2 excluded) → index 0 → 3
      expect(
        generateRandomNumber({ min: 1, max: 5, exceptions: [1, 2] })
      ).toBe(3)
    })
  })

  // Degenerate inputs resolve to `min` with no randomness involved — so they're
  // plain deterministic assertions.
  describe('degenerate inputs fall back to min', () => {
    it('min > max → min', () => {
      expect(generateRandomNumber({ min: 5, max: 3 })).toBe(5)
    })

    it('min === max → that single value', () => {
      expect(generateRandomNumber({ min: 4, max: 4 })).toBe(4)
    })

    // Every value excluded → empty candidate list → returns `min`, even though
    // `min` itself is an exception. Pinning the real fallback contract.
    it('all values excluded → min (documented fallback)', () => {
      expect(
        generateRandomNumber({ min: 1, max: 3, exceptions: [1, 2, 3] })
      ).toBe(1)
    })
  })
})
