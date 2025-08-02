import { FORTUNE_WHEEL_MODAL_TYPE, FortuneWheelModalState } from '@types'
import { Dispatch, SetStateAction } from 'react'

export type WheelOfFortuneModalProps = {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<FortuneWheelModalState>>
  onFinish: (result: number) => void
  initialResult: number
  sectors: Array<string>
  additionalAttemptCost?: number
  type: FORTUNE_WHEEL_MODAL_TYPE
}
