import { POWER_UP_GRADE, POWER_UP_TYPE } from '@types'
import { StyleProp, ViewStyle } from 'react-native'

export type PowerUpIconProps = {
  type: POWER_UP_TYPE
  color: POWER_UP_GRADE
  size?: number
  textSize?: number
  textStyle?: StyleProp<ViewStyle>
}
