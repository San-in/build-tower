import { BUTTON_TYPE } from '@types'
import {
  DimensionValue,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native'

export type ButtonProps = PressableProps & {
  title: string
  type?: BUTTON_TYPE
  minWidth?: DimensionValue
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  buttonContainerStyle?: StyleProp<ViewStyle>
  textSize?: number
}
