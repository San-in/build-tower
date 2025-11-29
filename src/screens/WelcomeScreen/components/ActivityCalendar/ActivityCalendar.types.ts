import { CalendarPrize } from '@types'

export type ActivityCalendarProps = {
  isOpen: boolean
  onClose: () => void
}
export type PrizeModalData = {
  isVisible: boolean
  prize: CalendarPrize
  count: number
  day: number
}
