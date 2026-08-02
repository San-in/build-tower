import {
  AddBlocksMasterIcon,
  AddExtraStepIconIcon,
  AwardsCollectionerIcon,
  CompleteLevelIcon,
  EarlyClearIcon,
  NoPowerUpsIcon,
  NoResetStepsIcon,
  PowerUpsMasterIcon,
  RemoveBlocksMasterIcon,
} from '@assets/icons'
import { MARKET_PRODUCT, MARKET_SPECIAL_PRIZE } from '@types'
import React, { ReactNode } from 'react'

export enum AWARD_TYPE {
  EARLY_CLEAR = 'early_clear',
  LEVEL_COMPLETED = 'level_completed',
  NO_POWER_UPS = 'no_power_ups',
  NO_RESET_STEPS = 'no_reset_steps',
  ADD_BLOCKS_MASTER = 'add_blocks_master',
  REMOVE_BLOCKS_MASTER = 'remove_blocks_master',
  ADD_EXTRA_STEP_MASTER = 'add_extra_step_master',
  POWER_UP_MASTER = 'power_up_master',
  AWARDS_COLLECTIONER = 'awards_collectioner',
}

export type AwardLevelCondition = {
  targetRepeats: number
  prizeType: MARKET_SPECIAL_PRIZE | MARKET_PRODUCT
  prizeCount: number
}

export type AwardLevelConditionsMap = Record<number, AwardLevelCondition>

export type AwardConfig = {
  type: AWARD_TYPE
  name: string
  icon: ReactNode
  maxLevel: number
  levelConditions: AwardLevelConditionsMap
  description: string
}
export const reachAwardsConditions: Array<AwardConfig> = [
  {
    type: AWARD_TYPE.EARLY_CLEAR,
    name: 'Early Clear',
    description: 'Finish a level early without using all available steps.',
    icon: <EarlyClearIcon height={'100%'} width={'100%'} />,
    maxLevel: 5,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 10,
      },
      2: {
        targetRepeats: 6,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 20,
      },
      3: {
        targetRepeats: 16,
        prizeType: MARKET_PRODUCT.AddExtraStep,
        prizeCount: 1,
      },
      4: {
        targetRepeats: 31,
        prizeType: MARKET_PRODUCT.RemoveRandomBlocks_Bronze,
        prizeCount: 1,
      },
      5: {
        targetRepeats: 51,
        prizeType: MARKET_PRODUCT.AddRandomBlocks_Silver,
        prizeCount: 1,
      },
    },
  },
  {
    type: AWARD_TYPE.LEVEL_COMPLETED,
    name: 'Complete Level',
    description:
      'Complete a level successfully with any positive result (1–3 stars).',
    icon: <CompleteLevelIcon height={'100%'} width={'100%'} />,
    maxLevel: 5,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 5,
      },
      2: {
        targetRepeats: 11,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 10,
      },
      3: {
        targetRepeats: 26,
        prizeType: MARKET_PRODUCT.AddExtraStep,
        prizeCount: 1,
      },
      4: {
        targetRepeats: 46,
        prizeType: MARKET_PRODUCT.RemoveRandomBlocks_Bronze,
        prizeCount: 1,
      },
      5: {
        targetRepeats: 76,
        prizeType: MARKET_PRODUCT.AddRandomBlocks_Bronze,
        prizeCount: 1,
      },
    },
  },
  {
    type: AWARD_TYPE.NO_POWER_UPS,
    name: 'No Power Ups',
    description:
      'Complete a level successfully without using any power-ups (Add Random Blocks, Remove Random Blocks, Add Extra Step).',
    icon: <NoPowerUpsIcon height={'100%'} width={'100%'} />,
    maxLevel: 5,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_PRODUCT.AddRandomBlocks_Bronze,
        prizeCount: 1,
      },
      2: {
        targetRepeats: 6,
        prizeType: MARKET_PRODUCT.RemoveRandomBlocks_Bronze,
        prizeCount: 1,
      },
      3: {
        targetRepeats: 11,
        prizeType: MARKET_PRODUCT.AddExtraStep,
        prizeCount: 1,
      },
      4: {
        targetRepeats: 31,
        prizeType: MARKET_PRODUCT.RemoveRandomBlocks_Silver,
        prizeCount: 1,
      },
      5: {
        targetRepeats: 61,
        prizeType: MARKET_PRODUCT.AddRandomBlocks_Silver,
        prizeCount: 1,
      },
    },
  },
  {
    type: AWARD_TYPE.NO_RESET_STEPS,
    name: 'No Reset Steps',
    description: 'Complete a level without using the Reset Step feature.',
    icon: <NoResetStepsIcon height={'100%'} width={'100%'} />,
    maxLevel: 5,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 10,
      },
      2: {
        targetRepeats: 4,
        prizeType: MARKET_PRODUCT.AddExtraStep,
        prizeCount: 1,
      },
      3: {
        targetRepeats: 9,
        prizeType: MARKET_PRODUCT.AddRandomBlocks_Bronze,
        prizeCount: 1,
      },
      4: {
        targetRepeats: 19,
        prizeType: MARKET_PRODUCT.RemoveRandomBlocks_Bronze,
        prizeCount: 1,
      },
      5: {
        targetRepeats: 34,
        prizeType: MARKET_PRODUCT.AddRandomBlocks_Gold,
        prizeCount: 1,
      },
    },
  },
  {
    type: AWARD_TYPE.ADD_BLOCKS_MASTER,
    name: 'Add Master',
    description: 'Use any Add Random Blocks power-up.',
    icon: <AddBlocksMasterIcon height={'100%'} width={'100%'} />,
    maxLevel: 5,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 10,
      },
      2: {
        targetRepeats: 11,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 20,
      },
      3: {
        targetRepeats: 26,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 50,
      },
      4: {
        targetRepeats: 51,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 100,
      },
      5: {
        targetRepeats: 101,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 200,
      },
    },
  },
  {
    type: AWARD_TYPE.REMOVE_BLOCKS_MASTER,
    name: 'Remove Master',
    description: 'Use any Remove Random Blocks power-up.',
    icon: <RemoveBlocksMasterIcon height={'100%'} width={'100%'} />,
    maxLevel: 5,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 10,
      },
      2: {
        targetRepeats: 11,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 20,
      },
      3: {
        targetRepeats: 26,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 50,
      },
      4: {
        targetRepeats: 51,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 100,
      },
      5: {
        targetRepeats: 101,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 200,
      },
    },
  },
  {
    type: AWARD_TYPE.ADD_EXTRA_STEP_MASTER,
    name: 'Extra Step Master',
    description: 'Use the Add Extra Step power-up.',
    icon: <AddExtraStepIconIcon height={'100%'} width={'100%'} />,
    maxLevel: 5,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 10,
      },
      2: {
        targetRepeats: 11,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 20,
      },
      3: {
        targetRepeats: 26,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 50,
      },
      4: {
        targetRepeats: 51,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 100,
      },
      5: {
        targetRepeats: 101,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 200,
      },
    },
  },
  {
    type: AWARD_TYPE.POWER_UP_MASTER,
    name: 'Power Up Master',
    description:
      'Reach the maximum level in all power-up related awards (Add Blocks Master, Remove Blocks Master, Add Extra Step Master).',
    icon: <PowerUpsMasterIcon height={'100%'} width={'100%'} />,
    maxLevel: 1,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 200,
      },
    },
  },
  {
    type: AWARD_TYPE.AWARDS_COLLECTIONER,
    name: 'Awards Collectioner',
    description: 'Reach the maximum level in all awards.',
    icon: <AwardsCollectionerIcon height={'100%'} width={'100%'} />,
    maxLevel: 1,
    levelConditions: {
      1: {
        targetRepeats: 1,
        prizeType: MARKET_SPECIAL_PRIZE.Bananas,
        prizeCount: 500,
      },
    },
  },
]

export const getAwardConfigByType = (
  type: AWARD_TYPE
): AwardConfig | undefined => reachAwardsConditions.find((c) => c.type === type)
