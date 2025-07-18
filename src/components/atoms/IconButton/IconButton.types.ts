import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type IconButtonProps = {
  onPress: () => void
  icon: React.ReactNode
  style?: StyleProp<ViewStyle>
  pressedStyles?: StyleProp<ViewStyle>
  labelStyles?: StyleProp<TextStyle>
  labelSize?: number
  label?: string
  isDisabled?: boolean
}
