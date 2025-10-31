import { POWER_UP_GRADE, POWER_UP_TYPE } from '@types'
import { StyleProp, ViewStyle } from 'react-native'

export type PowerUpButtonProps = {
  type: POWER_UP_TYPE
  onPress: () => void
  count?: number
  size?: number
  style?: StyleProp<ViewStyle>
  color?: POWER_UP_GRADE
  isDisabled?: boolean
}
