import { calculateExpectedLevelConditions } from '../calculateExpectedLevelConditions'

/**
 * calculateExpectedLevelConditions(target) → [gold, silver, bronze] block
 * thresholds for a level. Contract:
 *   - gold   = target (exact match wins gold)
 *   - silver = ceil(target * 0.9), forced strictly below gold
 *   - bronze = ceil(target * 0.8), forced strictly below silver
 *   - every tier is clamped to be at least 1 (no zero/negative thresholds)
 *
 * We import the function DIRECTLY (not from '@utils') so the test loads only
 * this pure function, not the whole barrel (which pulls SVG/asset imports).
 */
describe('calculateExpectedLevelConditions', () => {
  // Happy path: for comfortably large targets the raw 90% / 80% math already
  // lands on distinct integers, so no clamping kicks in.
  describe('typical targets', () => {
    it.each([
      [100, [100, 90, 80]],
      [50, [50, 45, 40]],
      [10, [10, 9, 8]],
    ])('target %i → %j', (target, expected) => {
      expect(calculateExpectedLevelConditions(target)).toEqual(expected)
    })
  })

  // Boundary zone: this is where bugs live. For small targets, ceil(0.9x) and
  // ceil(0.8x) round UP into (or past) the tier above them, so the "strictly
  // below" clamps fire. Below 3 blocks there simply aren't 3 distinct positive
  // tiers, so silver/bronze collapse onto 1 — that is the intended behavior,
  // and pinning it here documents it (and guards the old non-positive bug).
  describe('smallest targets (model degrades by design)', () => {
    it.each([
      [3, [3, 2, 1]], // last target where all three tiers stay distinct
      [2, [2, 1, 1]], // silver & bronze collapse to 1
      [1, [1, 1, 1]], // everything collapses to 1
    ])('target %i → %j', (target, expected) => {
      expect(calculateExpectedLevelConditions(target)).toEqual(expected)
    })
  })

  // Instead of hand-picking every input, assert the INVARIANTS that must hold
  // across a whole range. This catches a bad edit anywhere in 1..500 at once —
  // property-style thinking on top of the example-based tests above.
  describe('invariants across a range', () => {
    const targets = Array.from({ length: 500 }, (_, i) => i + 1)

    it('never returns a threshold below 1', () => {
      targets.forEach((target) => {
        const [gold = 0, silver = 0, bronze = 0] = calculateExpectedLevelConditions(target)
        expect(gold).toBeGreaterThanOrEqual(1)
        expect(silver).toBeGreaterThanOrEqual(1)
        expect(bronze).toBeGreaterThanOrEqual(1)
      })
    })

    it('is always ordered gold >= silver >= bronze', () => {
      targets.forEach((target) => {
        const [gold = 0, silver = 0, bronze = 0] = calculateExpectedLevelConditions(target)
        expect(gold).toBeGreaterThanOrEqual(silver)
        expect(silver).toBeGreaterThanOrEqual(bronze)
      })
    })

    it('keeps all three tiers STRICTLY distinct once target >= 3', () => {
      targets
        .filter((target) => target >= 3)
        .forEach((target) => {
          const [gold = 0, silver = 0, bronze = 0] =
            calculateExpectedLevelConditions(target)
          expect(gold).toBeGreaterThan(silver)
          expect(silver).toBeGreaterThan(bronze)
        })
    })
  })
})
