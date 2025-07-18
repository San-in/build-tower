import { ReactNode } from 'react'
import {
  KeyboardType,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from 'react-native'

export type InputProps = {
  icon: ReactNode
  isDisabled?: boolean
  isValid?: boolean
  label: string
  placeholder?: string
  supportingText?: string
  onChange: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  value: string
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  style?: StyleProp<ViewStyle>
  multiline?: boolean
  keyboardType?: KeyboardType
  autoCorrect?: boolean
  textContentType?: TextInputProps['textContentType']
}
