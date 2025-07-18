import { LEVEL_RESULT } from '@types'

export const levelResultKeyMap: Record<LEVEL_RESULT, string> = {
  [LEVEL_RESULT.GoldResult]: 'goldResult',
  [LEVEL_RESULT.SilverResult]: 'silverResult',
  [LEVEL_RESULT.BronzeResult]: 'bronzeResult',
  [LEVEL_RESULT.TooHigh]: 'default',
  [LEVEL_RESULT.TooLow]: 'default',
}

export const secondaryMessageMap: Record<LEVEL_RESULT, string> = {
  [LEVEL_RESULT.GoldResult]:
    'But wait… what’s better than that? Maybe double the bananas?',
  [LEVEL_RESULT.SilverResult]:
    'Keep your reward, restart the level, or reset steps and go for gold?',
  [LEVEL_RESULT.BronzeResult]:
    'Get a prize, restart the level, or reset steps and go for extra stars?',
  [LEVEL_RESULT.TooLow]: 'Reset steps, restart the level, or head Home?',
  [LEVEL_RESULT.TooHigh]: 'Reset steps or restart the level to fix it!',
}

export const headerContentMap: Record<
  LEVEL_RESULT,
  { icon: string; text: string; subTitle: string }
> = {
  [LEVEL_RESULT.TooHigh]: {
    icon: '🐒',
    text: 'Whoa!',
    subTitle: 'Your tower is too tall...',
  },
  [LEVEL_RESULT.TooLow]: {
    icon: '🍌',
    text: 'Uh-oh…',
    subTitle: 'That tower’s too short...',
  },
  [LEVEL_RESULT.GoldResult]: {
    icon: '🥇',
    text: 'Brilliant!',
    subTitle: 'Top monkey style!',
  },
  [LEVEL_RESULT.SilverResult]: {
    icon: '🥈',
    text: 'Nice!',
    subTitle: 'Wow! Not bad at all!',
  },
  [LEVEL_RESULT.BronzeResult]: {
    icon: '🥉',
    text: 'Good job!',
    subTitle: 'Each star matters',
  },
}
