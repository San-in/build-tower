import { Star } from '@types'

export type LevelConditionsModalContentProps = {
  prize: number
  initialBlocksQuantity: number
  onConfirm: () => void
  confirmButtonText?: string
  stars: Star
}
