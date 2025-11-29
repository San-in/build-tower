import { CalendarPrize } from '@types'
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
  prize: CalendarPrize
  quantity: number
}) => void

export type CalendarItemProps = {
  day: number
  prize: CalendarPrize
  quantity: number
  itemWidth?: number
  isSelected?: boolean
  onSelect: onSelectCalendarItem
}
