import { LevelId, ModalState, TOWER } from '@types'
import { Dispatch, SetStateAction } from 'react'

export type WheelOfFortuneModalProps = {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<ModalState<TOWER>>>
  onFinish: (result: number) => void
  initialResult?: number | LevelId
  sectors: Array<string>
  additionalAttemptCost?: number
}
