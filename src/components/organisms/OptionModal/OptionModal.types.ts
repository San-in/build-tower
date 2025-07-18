import { OptionValue, SELECTED_OPTION } from '@types'

export type OptionModalProps = {
  modalVisible: boolean
  handleClose: () => void
  firstOption: OptionValue
  secondOption: OptionValue
  changeOption: (option: SELECTED_OPTION) => void
  step: number
}
