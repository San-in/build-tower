import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type OutlinedTextProps = {
  children: string
  fontSize?: number
  color?: string
  strokeColor?: string
  offset?: number
  style?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  numberOfLines?: number
  adjustsFontSizeToFit?: boolean
}
