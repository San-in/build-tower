import { POWER_UP_GRADE, POWER_UP_TYPE } from '@types'

export type PowerUpModalContentProps = {
  type: POWER_UP_TYPE
  onCancel: () => void
  onConfirm: ({
    grade,
    type,
  }: {
    grade: POWER_UP_GRADE | null
    type: POWER_UP_TYPE
  }) => void
}
