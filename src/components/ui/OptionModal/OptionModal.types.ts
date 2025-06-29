import { OptionValue, SELECTED_OPTION } from '@types'
import { Dispatch, SetStateAction } from 'react'

export type OptionModalProps = {
  modalVisible: boolean
  handleClose: () => void
  firstOption: OptionValue
  secondOption: OptionValue
  changeOption: Dispatch<SetStateAction<SELECTED_OPTION>>
  step: number
}
