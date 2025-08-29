import { MonkeyNotificationProps } from '@components/atoms/MonkeyNotification/MonkeyNotofocation.types'
import { MONKEY_NOTIFICATION_STATUS } from '@types'

export const resolveStatus = (
  goal: number,
  current: number,
  {
    tooMuchFactor = 1.5,
    tooLittleFactor = 0.5,
    closeDelta = 0.1,
  }: Required<NonNullable<MonkeyNotificationProps['thresholds']>> = {
    tooMuchFactor: 1.5,
    tooLittleFactor: 0.5,
    closeDelta: 0.1,
  }
): MONKEY_NOTIFICATION_STATUS => {
  if (goal <= 0) {
    return MONKEY_NOTIFICATION_STATUS.Neutral
  }
  const tooMuch = current >= goal * tooMuchFactor
  const tooLittle = current <= goal * tooLittleFactor
  const closeLow = goal * (1 - closeDelta)
  const closeHigh = goal * (1 + closeDelta)

  if (tooMuch) {
    return MONKEY_NOTIFICATION_STATUS.TooMuchForWin
  }
  if (tooLittle) {
    return MONKEY_NOTIFICATION_STATUS.TooLittleForWin
  }
  if (current >= closeLow && current <= closeHigh) {
    return MONKEY_NOTIFICATION_STATUS.CloseToWin
  }
  return MONKEY_NOTIFICATION_STATUS.Neutral
}
