import { BONUS_OPTION_TYPE } from '@types'

export type ModalCardProps = {
  onPress: () => void
  option: BONUS_OPTION_TYPE
  isSelected: boolean
  isDisabled?: boolean
  price: number
}
