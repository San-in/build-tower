import { Star } from '@types'

export type LevelResultModalContentProps = {
  onRestartLevel: ({
    prize,
    stars,
    consolationPrize,
  }: {
    prize: number
    stars: Star
    consolationPrize?: number
  }) => void
  onGoHome: () => void
  onResetSteps: () => void
  onGetDoublePrize: ({
    prize,
    stars,
    consolationPrize,
  }: {
    prize: number
    stars: Star
    consolationPrize?: number
  }) => void
  onGetPrize: ({
    prize,
    stars,
    consolationPrize,
  }: {
    prize: number
    stars: Star
    consolationPrize?: number
  }) => void
  initialBlockValue: number
  userBlockValue: number
  prize: number
  stars: Star
  isResetStepsDisabled?: boolean
}
