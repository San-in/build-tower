import { MONKEY_ANIMATION_TYPE } from '@types'
import { StyleProp, ViewStyle } from 'react-native'

export type MonkeyAnimationProps = {
  type: MONKEY_ANIMATION_TYPE
  isVisible: boolean
  onFinish?: () => void
  containerStyles?: StyleProp<ViewStyle>
  speed?: number
  loop?: boolean
  size?: number
}
