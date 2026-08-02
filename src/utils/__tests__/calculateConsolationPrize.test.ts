import { calculateConsolationPrize } from '../calculateConsolationPrize'

/**
 * calculateConsolationPrize(prize) = 20% of the prize, ROUNDED, but never less
 * than a floor of 5. (Given on a 3-star replay where the real prize is already
 * claimed.) Two behaviors stacked: a minimum-floor threshold + rounding.
 */
describe('calculateConsolationPrize', () => {
  // The floor at 5 covers everything up to prize 25 (25 * 0.2 = 5). The first
  // integer prize that actually beats the floor is 28 (5.6 → 6); 26 & 27 still
  // round down to 5. These boundary rows are the whole point of the test.
  describe('floor + rounding boundaries', () => {
    it.each([
      [0, 5], // 0 → below floor
      [24, 5], // 4.8 → below floor
      [25, 5], // 5.0 → exactly the floor
      [26, 5], // 5.2 → rounds to 5
      [27, 5], // 5.4 → rounds to 5
      [28, 6], // 5.6 → rounds up past the floor
      [30, 6], // 6.0
      [100, 20], // 20.0
    ])('prize %i → %i', (prize, expected) => {
      expect(calculateConsolationPrize(prize)).toBe(expected)
    })
  })

  // Invariants over a range: it should always pay at least 5, and always a whole
  // number of bananas (never a fraction).
  describe('invariants across a range', () => {
    const prizes = Array.from({ length: 300 }, (_, i) => i)

    it('never pays below the floor of 5', () => {
      prizes.forEach((prize) => {
        expect(calculateConsolationPrize(prize)).toBeGreaterThanOrEqual(5)
      })
    })

    it('always returns a whole number', () => {
      prizes.forEach((prize) => {
        expect(Number.isInteger(calculateConsolationPrize(prize))).toBe(true)
      })
    })
  })
})
