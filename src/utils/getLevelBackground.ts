import type { LevelId } from '@types'

export const LEVEL_BACKGROUNDS = {
  1: require('../../assets/images/levels/1/background.webp'),
  2: require('../../assets/images/levels/2/background.webp'),
  3: require('../../assets/images/levels/3/background.webp'),
  4: require('../../assets/images/levels/4/background.webp'),
  5: require('../../assets/images/levels/5/background.webp'),
  6: require('../../assets/images/levels/6/background.webp'),
  7: require('../../assets/images/levels/7/background.webp'),
  8: require('../../assets/images/levels/8/background.webp'),
  9: require('../../assets/images/levels/9/background.webp'),
  10: require('../../assets/images/levels/10/background.webp'),
  11: require('../../assets/images/levels/11/background.webp'),
  12: require('../../assets/images/levels/12/background.webp'),
  13: require('../../assets/images/levels/13/background.webp'),
  14: require('../../assets/images/levels/14/background.webp'),
  15: require('../../assets/images/levels/15/background.webp'),
  16: require('../../assets/images/levels/16/background.webp'),
  17: require('../../assets/images/levels/17/background.webp'),
  18: require('../../assets/images/levels/18/background.webp'),
  19: require('../../assets/images/levels/19/background.webp'),
  20: require('../../assets/images/levels/20/background.webp'),
  21: require('../../assets/images/levels/21/background.webp'),
  22: require('../../assets/images/levels/22/background.webp'),
  23: require('../../assets/images/levels/23/background.webp'),
  24: require('../../assets/images/levels/24/background.webp'),
  25: require('../../assets/images/levels/25/background.webp'),
  26: require('../../assets/images/levels/26/background.webp'),
  27: require('../../assets/images/levels/27/background.webp'),
  28: require('../../assets/images/levels/28/background.webp'),
  29: require('../../assets/images/levels/29/background.webp'),
  30: require('../../assets/images/levels/30/background.webp'),
} as const satisfies Record<LevelId, number>

export const getLevelBackground = (level: LevelId) =>
  LEVEL_BACKGROUNDS[level] ?? LEVEL_BACKGROUNDS[1]
