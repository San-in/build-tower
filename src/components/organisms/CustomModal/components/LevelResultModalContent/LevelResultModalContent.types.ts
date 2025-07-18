import { Star } from '@types'

export type LevelResultModalContentProps = {
  onRestartLevel: ({ prize, stars }: { prize: number; stars: Star }) => void
  onGoHome: () => void
  onResetSteps: () => void
  onGetDoublePrize: ({ prize, stars }: { prize: number; stars: Star }) => void
  onGetPrize: ({ prize, stars }: { prize: number; stars: Star }) => void
  initialBlockValue: number
  userBlockValue: number
  prize: number
  stars: Star
  isResetStepsDisabled?: boolean
}
