import { MarketPrize } from '@types'
type onSelectCalendarItem = ({
  isAchieved,
  isRewardClaimed,
  day,
  prize,
  quantity,
}: {
  isAchieved: boolean
  isRewardClaimed: boolean
  day: number
  prize: MarketPrize
  quantity: number
}) => void

export type CalendarItemProps = {
  day: number
  prize: MarketPrize
  quantity: number
  itemWidth?: number
  isSelected?: boolean
  onSelect: onSelectCalendarItem
}
