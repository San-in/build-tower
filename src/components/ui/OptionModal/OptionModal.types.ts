import { OptionValue } from '@types'
import { Dispatch, SetStateAction } from 'react'

export type OptionModalProps = {
  modalVisible: boolean
  handleClose: () => void
  firstOption: OptionValue
  secondOption: OptionValue
  changeOption: Dispatch<SetStateAction<2 | 1 | null>>
}
