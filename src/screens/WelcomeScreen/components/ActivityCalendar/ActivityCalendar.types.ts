import { MarketPrize } from '@types'

export type ActivityCalendarProps = {
  isOpen: boolean
  onClose: () => void
}
export type PrizeModalData = {
  isVisible: boolean
  prize: MarketPrize
  count: number
  day: number
}
