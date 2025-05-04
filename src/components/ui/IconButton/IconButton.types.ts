import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type IconButtonProps = {
  onPress: () => void
  icon: React.ReactNode
  style?: StyleProp<ViewStyle>
  pressedStyles?: StyleProp<ViewStyle>
}
