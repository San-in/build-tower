import { UKFlagIcon } from '@assets/icons/flags'
import {
  CalendarReward,
  Country,
  LEVEL_DIFFICULTY,
  LevelConfig,
  LevelId,
  MARKET_PRODUCT,
  MARKET_SPECIAL_PRIZE,
  POWER_UP_GRADE,
  Z_INDEX_PRIORITY,
} from '@types'

import { formatTabletElementsSize } from '../utils/formatTabletElementsSize'

export { IS_TABLET } from './device'

export const HOURS_IN_DAY = 24
export const TOTAL_LEVELS = 30
export const LEVEL_CARD_WIDTH = formatTabletElementsSize(200)
export const LEVEL_CARD_GAP = formatTabletElementsSize(20)
export const INITIAL_SPIN_QUANTITY = 4
export const BLOCK_DIMENSION = formatTabletElementsSize(70, 1.8)
export const Z_INDEX_TYPE: Record<Z_INDEX_PRIORITY, number> = {
  [Z_INDEX_PRIORITY.Hidden]: -1,
  [Z_INDEX_PRIORITY.Minimal]: 1,
  [Z_INDEX_PRIORITY.Medium]: 3,
  [Z_INDEX_PRIORITY.High]: 5,
  [Z_INDEX_PRIORITY.ExtraHigh]: 10,
}

export const LEVEL_CONFIG: Record<LevelId, LevelConfig> = {
  1: {
    firstTower: {
      start: 1,
      fortuneWheelData: [
        '+6',
        'x8',
        '+9',
        'x11',
        '+12',
        '+14',
        'x7',
        'x13',
        '+8',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x1', 'x2', '+1', '÷1', 'x3'],
    },
    simpleOperators: {
      start: 1,
      end: 5,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 20,
    attempts: 6,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  2: {
    firstTower: {
      start: 2,
      fortuneWheelData: [
        '+5',
        'x4',
        'x7',
        'x5',
        '+9',
        'x6',
        '+11',
        'x7',
        '+13',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['+1', 'x1', 'x2', '+3', '÷1'],
    },
    simpleOperators: {
      start: 1,
      end: 5,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 22,
    attempts: 6,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  3: {
    firstTower: {
      start: 3,
      fortuneWheelData: [
        '+5',
        'x3',
        '+7',
        'x4',
        '+10',
        'x5',
        '+13',
        '+8',
        '+11',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x3', '+2', '+1', 'x4', '÷1'],
    },
    simpleOperators: {
      start: 1,
      end: 6,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 24,
    attempts: 6,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  4: {
    firstTower: {
      start: 4,
      fortuneWheelData: ['+4', 'x3', '+5', 'x4', '+6', 'x2', '+7', '+8', '+9'],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x3', '+2', 'x1', 'x4', '+1'],
    },
    simpleOperators: {
      start: 1,
      end: 6,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 26,
    attempts: 6,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  5: {
    firstTower: {
      start: 5,
      fortuneWheelData: [
        '+4',
        'x2',
        '+6',
        'x3',
        '+7',
        '+9',
        '+8',
        '+12',
        '+10',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['÷1', '+3', 'x2', '+5', '+4'],
    },
    simpleOperators: {
      start: 1,
      end: 6,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 28,
    attempts: 6,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  6: {
    firstTower: {
      start: 6,
      fortuneWheelData: ['+3', 'x2', '+5', '+6', '+8', '+7', '+9', '+11', '+4'],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x3', '÷1', '+2', 'x5', '+4'],
    },
    simpleOperators: {
      start: 1,
      end: 6,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 29,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  7: {
    firstTower: {
      start: 7,
      fortuneWheelData: ['+3', '+4', 'x2', '+5', '+6', '+7', '+9', '+8', '+11'],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x1', '+4', 'x3', '+2', 'x5'],
    },
    simpleOperators: {
      start: 1,
      end: 6,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 28,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  8: {
    firstTower: {
      start: 8,
      fortuneWheelData: [
        '+2',
        'x1.5',
        '+3',
        '+4',
        '+6',
        '+5',
        '+7',
        'x2',
        '+10',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x3', 'x2', '÷1', '+5', '+4'],
    },
    simpleOperators: {
      start: 1,
      end: 6,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 30,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  9: {
    firstTower: {
      start: 9,
      fortuneWheelData: ['+2', '+4', '+3', 'x2', '+7', '+8', '+5', '+10', '+6'],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x1', '+2', '÷1', '+4', 'x3'],
    },
    simpleOperators: {
      start: 1,
      end: 6,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 32,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  10: {
    firstTower: {
      start: 10,
      fortuneWheelData: [
        '+2',
        '+1',
        'x1.5',
        '+6',
        '+4',
        '+7',
        '+9',
        '+8',
        '+3',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x4', '+2', '+1', '÷1', 'x1'],
    },
    simpleOperators: {
      start: 1,
      end: 7,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 34,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Easy,
  },
  11: {
    firstTower: {
      start: 1,
      fortuneWheelData: [
        '+13',
        '+15',
        '+11',
        'x13',
        'x15',
        '+19',
        '+16',
        '+17',
        '+18',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x2', '+2', 'x1', 'x4', 'x5'],
    },
    simpleOperators: {
      start: 1,
      end: 7,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 36,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  12: {
    firstTower: {
      start: 2,
      fortuneWheelData: [
        '+13',
        'x7',
        '+17',
        '+14',
        'x6',
        '+16',
        '+18',
        '+13',
        'x8',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['÷1', '+3', '+4', 'x2', 'x3'],
    },
    simpleOperators: {
      start: 1,
      end: 7,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 38,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  13: {
    firstTower: {
      start: 3,
      fortuneWheelData: [
        '+14',
        '+13',
        '+11',
        'x5',
        '+10',
        'x6',
        '+18',
        '+16',
        '+17',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x2', '÷1', 'x3', '+3', 'x5'],
    },
    simpleOperators: {
      start: 1,
      end: 8,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 40,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  14: {
    firstTower: {
      start: 4,
      fortuneWheelData: [
        '+12',
        '+11',
        'x3.5',
        '+9',
        'x4.5',
        '+15',
        'x5',
        '+17',
        '+13',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x1', '+3', '+4', 'x2', 'x3'],
    },
    simpleOperators: {
      start: 1,
      end: 8,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 42,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  15: {
    firstTower: {
      start: 5,
      fortuneWheelData: [
        '+12',
        '+9',
        '+17',
        '+14',
        'x4',
        '+11',
        '+10',
        '+13',
        '+15',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x1', 'x3', '+3', 'x2', 'x5'],
    },
    simpleOperators: {
      start: 1,
      end: 9,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 44,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  16: {
    firstTower: {
      start: 6,
      fortuneWheelData: [
        '+8',
        '+11',
        'x2.5',
        '+10',
        '+12',
        '+13',
        'x3.5',
        '+15',
        '+14',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['+1', '+2', '+3', '+4', 'x1'],
    },
    simpleOperators: {
      start: 1,
      end: 9,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 46,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  17: {
    firstTower: {
      start: 7,
      fortuneWheelData: [
        '+10',
        '+8',
        '+13',
        'x3',
        '+11',
        '+9',
        '+16',
        '+12',
        '+15',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x3', '+3', '÷1', '+1', 'x5', '+5'],
    },
    simpleOperators: {
      start: 1,
      end: 10,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 48,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  18: {
    firstTower: {
      start: 8,
      fortuneWheelData: [
        '+9',
        '+7',
        '+13',
        'x2',
        '+10',
        '+14',
        '+11',
        '+15',
        'x2.5',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x1', '+2', 'x4', '+4', 'x2', 'x6'],
    },
    simpleOperators: {
      start: 1,
      end: 10,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 50,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  19: {
    firstTower: {
      start: 9,
      fortuneWheelData: [
        '+7',
        '+13',
        '+8',
        'x2',
        '+12',
        '+10',
        '+15',
        '+11',
        '+14',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['+5', '+3', '+1', 'x1', 'x3', 'x5'],
    },
    simpleOperators: {
      start: 1,
      end: 10,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 52,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  20: {
    firstTower: {
      start: 10,
      fortuneWheelData: [
        '+6',
        '+7',
        '+8',
        '+9',
        '+11',
        '+12',
        '+13',
        '+14',
        'x2',
      ],
    },
    secondTower: {
      start: 1,
      fortuneWheelData: ['x1', 'x6', 'x3', 'x4', 'x5', '+1'],
    },
    simpleOperators: {
      start: 1,
      end: 10,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 54,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Medium,
  },
  21: {
    firstTower: {
      start: 1,
      fortuneWheelData: [
        '+21',
        'x24',
        '+19',
        '+17',
        '+23',
        '+18',
        '+22',
        '+20',
        '+24',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['x1', 'x3', '+1', 'x2', '+3'],
    },
    simpleOperators: {
      start: 1,
      end: 10,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 56,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  22: {
    firstTower: {
      start: 2,
      fortuneWheelData: [
        '+21',
        '+16',
        'x9',
        '+20',
        '+23',
        'x8.5',
        '+18',
        '+22',
        '+19',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['x2.5', 'x3', '÷1', '+2', '+1'],
    },
    simpleOperators: {
      start: 2,
      end: 10,
    },
    multiplicativeOperators: {
      start: 2,
      end: 3,
    },
    prize: 58,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  23: {
    firstTower: {
      start: 3,
      fortuneWheelData: [
        'x6',
        '+16',
        '+21',
        '+19',
        '+23',
        '+17',
        '+20',
        '+22',
        '+24',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['x1', 'x2', 'x2.5', 'x3', 'x1.5'],
    },
    simpleOperators: {
      start: 3,
      end: 11,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 60,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  24: {
    firstTower: {
      start: 4,
      fortuneWheelData: [
        'x4.5',
        'x5',
        'x5.5',
        '+17',
        '+18',
        '+19',
        '+21',
        '+23',
        '+24',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['+1', '+2', '+3', '+4', 'x1'],
    },
    simpleOperators: {
      start: 3,
      end: 12,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 62,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  25: {
    firstTower: {
      start: 5,
      fortuneWheelData: [
        '+14',
        '+17',
        '+18',
        'x4',
        '+22',
        '+20',
        '+21',
        '+19',
        '+16',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['x1', '+2', 'x3', '+3', '+1'],
    },
    simpleOperators: {
      start: 3,
      end: 12,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 64,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  26: {
    firstTower: {
      start: 6,
      fortuneWheelData: [
        'x4.5',
        '+13',
        '+14',
        '+15',
        '+16',
        '+17',
        'x4',
        '+19',
        '+20',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['x3', 'x2', '+3', '÷1', '+1'],
    },
    simpleOperators: {
      start: 2,
      end: 13,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 66,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  27: {
    firstTower: {
      start: 7,
      fortuneWheelData: [
        'x3',
        '+12',
        '+13',
        '+15',
        '+16',
        '+17',
        '+18',
        '+19',
        '+20',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['x1', 'x2', 'x3', '+1', '+3'],
    },
    simpleOperators: {
      start: 2,
      end: 13,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 68,
    attempts: 5,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  28: {
    firstTower: {
      start: 8,
      fortuneWheelData: [
        'x3.5',
        'x3',
        'x2.5',
        '+14',
        '+15',
        '+17',
        '+18',
        '+19',
        '+20',
      ],
    },
    secondTower: {
      start: 2,
      fortuneWheelData: ['+1', '+2', '+3', '+4', 'x1'],
    },
    simpleOperators: {
      start: 2,
      end: 13,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 70,
    attempts: 4,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  29: {
    firstTower: {
      start: 9,
      fortuneWheelData: [
        'x3',
        '+13',
        '+14',
        '+11',
        '+17',
        '+19',
        '+12',
        '+15',
        '+16',
      ],
    },
    secondTower: {
      start: 3,
      fortuneWheelData: ['x1', 'x2', '+1', '+2', '+4'],
    },
    simpleOperators: {
      start: 2,
      end: 13,
    },
    multiplicativeOperators: {
      start: 2,
      end: 4,
    },
    prize: 72,
    attempts: 4,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
  30: {
    firstTower: {
      start: 10,
      fortuneWheelData: [
        'x2.5',
        'x3',
        '+12',
        '+14',
        '+16',
        '+17',
        '+18',
        '+13',
        '+19',
      ],
    },
    secondTower: {
      start: 3,
      fortuneWheelData: ['+1', '÷1', '+2', 'x2', '+4'],
    },
    simpleOperators: {
      start: 2,
      end: 13,
    },
    multiplicativeOperators: {
      start: 2,
      end: 5,
    },
    prize: 75,
    attempts: 4,
    difficulty: LEVEL_DIFFICULTY.Hard,
  },
}

export const LEVEL_NAMES: Record<LevelId, string> = {
  1: 'New York',
  2: 'Los Angeles',
  3: 'Chicago',
  4: 'Dallas',
  5: 'Houston',
  6: 'Miami',
  7: 'Atlanta',
  8: 'Washington',
  9: 'Philadelphia',
  10: 'Phoenix',
  11: 'London',
  12: 'Paris',
  13: 'Dublin',
  14: 'Barcelona',
  15: 'Rome',
  16: 'Amsterdam',
  17: 'Berlin',
  18: 'Kyiv',
  19: 'Lviv',
  20: 'Donetsk',
  21: 'Tokyo',
  22: 'Jakarta',
  23: 'Manila',
  24: 'Seoul',
  25: 'Bangkok',
  26: 'Osaka',
  27: 'Ho Chi Minh',
  28: 'Taipei',
  29: 'Kuala Lumpur',
  30: 'Yangon',
}

export const COUNTRY_LIST: Array<Country> = [
  {
    id: 'USA',
    name: 'United States',
    code: '+1',
    flag: UKFlagIcon,
  },
  {
    id: 'CA',
    name: 'Canada',
    code: '+1',
    flag: UKFlagIcon,
  },
]

export const EMPTY_FUNCTION = () => {}

export const POWER_UP_BLOCK_MANIPULATION_LIMITS = {
  [POWER_UP_GRADE.Gold]: {
    min: 1,
    max: 10,
  },
  [POWER_UP_GRADE.Silver]: {
    min: 1,
    max: 7,
  },
  [POWER_UP_GRADE.Bronze]: {
    min: 1,
    max: 4,
  },
  [POWER_UP_GRADE.Base]: {
    min: 1,
    max: 1,
  },
}
// Max quantity of any single power-up a player may own (buy).
export const POWER_UP_PURCHASE_LIMIT = 10
// Once the player owns this many of a power-up, further purchases cost x2.
export const POWER_UP_PRICE_X2_THRESHOLD = 5
export const POWER_UP_PRICE_MULTIPLIER = 2

export const MARKET_PRODUCT_PRICE: Record<MARKET_PRODUCT, number> = {
  [MARKET_PRODUCT.RemoveRandomBlocks_Gold]: 20,
  [MARKET_PRODUCT.RemoveRandomBlocks_Silver]: 15,
  [MARKET_PRODUCT.RemoveRandomBlocks_Bronze]: 10,
  [MARKET_PRODUCT.AddRandomBlocks_Gold]: 20,
  [MARKET_PRODUCT.AddRandomBlocks_Silver]: 15,
  [MARKET_PRODUCT.AddRandomBlocks_Bronze]: 10,
  [MARKET_PRODUCT.AddExtraStep]: 15,
}

export const MARKET_PRODUCT_DESCRIPTION: Record<MARKET_PRODUCT, string> = {
  [MARKET_PRODUCT.RemoveRandomBlocks_Gold]:
    'Removes between 1 and 10 random blocks.',
  [MARKET_PRODUCT.RemoveRandomBlocks_Silver]:
    'Removes between 1 and 7 random blocks.',
  [MARKET_PRODUCT.RemoveRandomBlocks_Bronze]:
    'Removes between 1 and 4 random blocks.',
  [MARKET_PRODUCT.AddRandomBlocks_Gold]: 'Adds between 1 and 10 random blocks.',
  [MARKET_PRODUCT.AddRandomBlocks_Silver]:
    'Adds between 1 and 7 random blocks.',
  [MARKET_PRODUCT.AddRandomBlocks_Bronze]:
    'Adds between 1 and 4 random blocks.',
  [MARKET_PRODUCT.AddExtraStep]:
    'Rewinds one move back — gives you an extra step.',
}
export const STREAK_CALENDAR_DAYS = 14

export const CALENDAR_REWARDS: Array<CalendarReward> = [
  { day: 1, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 5 },
  { day: 2, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 10 },
  { day: 3, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 15 },
  { day: 4, prize: MARKET_PRODUCT.RemoveRandomBlocks_Bronze, quantity: 1 },
  { day: 5, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 20 },
  { day: 6, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 25 },
  { day: 7, prize: MARKET_PRODUCT.AddRandomBlocks_Bronze, quantity: 2 },
  { day: 8, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 30 },
  { day: 9, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 35 },
  { day: 10, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 40 },
  { day: 11, prize: MARKET_PRODUCT.AddExtraStep, quantity: 2 },
  { day: 12, prize: MARKET_SPECIAL_PRIZE.Bananas, quantity: 45 },
  { day: 13, prize: MARKET_PRODUCT.RemoveRandomBlocks_Silver, quantity: 2 },
  { day: 14, prize: MARKET_PRODUCT.AddRandomBlocks_Gold, quantity: 1 },
]
