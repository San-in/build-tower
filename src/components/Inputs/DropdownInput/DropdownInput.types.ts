import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type DropdownOption = {
  id: string
  value: string
}

export type DropdownInputProps = {
  label: string
  options?: Array<DropdownOption>
  isValid?: boolean
  isDisabled?: boolean
  supportingText?: string
  onChange: (value: string) => void
  value: string
  icon?: ReactNode
  onBlur: () => void
  placeholder?: string
  style?: StyleProp<ViewStyle>
}
