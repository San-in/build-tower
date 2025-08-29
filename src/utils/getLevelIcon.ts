import type { LevelId } from '@types'

export const LEVEL_ICONS = {
  1: require('../../assets/images/levels/1/icon.png'),
  2: require('../../assets/images/levels/2/icon.png'),
  3: require('../../assets/images/levels/3/icon.png'),
  4: require('../../assets/images/levels/4/icon.png'),
  5: require('../../assets/images/levels/5/icon.png'),
  6: require('../../assets/images/levels/6/icon.png'),
  7: require('../../assets/images/levels/7/icon.png'),
  8: require('../../assets/images/levels/8/icon.png'),
  9: require('../../assets/images/levels/9/icon.png'),
  10: require('../../assets/images/levels/10/icon.png'),
  11: require('../../assets/images/levels/11/icon.png'),
  12: require('../../assets/images/levels/12/icon.png'),
  13: require('../../assets/images/levels/13/icon.png'),
  14: require('../../assets/images/levels/14/icon.png'),
  15: require('../../assets/images/levels/15/icon.png'),
  16: require('../../assets/images/levels/16/icon.png'),
  17: require('../../assets/images/levels/17/icon.png'),
  18: require('../../assets/images/levels/18/icon.png'),
  19: require('../../assets/images/levels/19/icon.png'),
  20: require('../../assets/images/levels/20/icon.png'),
  21: require('../../assets/images/levels/21/icon.png'),
  22: require('../../assets/images/levels/22/icon.png'),
  23: require('../../assets/images/levels/23/icon.png'),
  24: require('../../assets/images/levels/24/icon.png'),
  25: require('../../assets/images/levels/25/icon.png'),
  26: require('../../assets/images/levels/26/icon.png'),
  27: require('../../assets/images/levels/27/icon.png'),
  28: require('../../assets/images/levels/28/icon.png'),
  29: require('../../assets/images/levels/29/icon.png'),
  30: require('../../assets/images/levels/30/icon.png'),
} as const satisfies Record<LevelId, number>

export const getLevelIcon = (level: LevelId) =>
  LEVEL_ICONS[level] ?? LEVEL_ICONS[1]
