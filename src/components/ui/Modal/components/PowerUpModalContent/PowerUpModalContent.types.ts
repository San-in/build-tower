import { POWER_UP_TYPE } from '@types'

export type PowerUpModalContentProps = {
  type: POWER_UP_TYPE
  onCancel: () => void
  onConfirm: () => void
}
