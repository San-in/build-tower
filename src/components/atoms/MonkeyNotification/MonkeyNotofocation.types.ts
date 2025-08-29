import { MONKEY_NOTIFICATION_STATUS } from '@types'

export type MonkeyPhrases = Partial<
  Record<MONKEY_NOTIFICATION_STATUS, Array<string>>
>

export type MonkeyNotificationProps = {
  visible: boolean
  goal: number
  current: number
  onRequestClose: () => void
  phrases?: MonkeyPhrases
  backdropClosable?: boolean
  autoHideMs?: number
  thresholds?: {
    tooMuchFactor: number
    tooLittleFactor: number
    closeDelta: number
  }
}
