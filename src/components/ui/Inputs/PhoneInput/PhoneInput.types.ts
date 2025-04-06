import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type PhoneError = {
  phone:
    | {
        message: string
      }
    | undefined
}

type PhoneInputValue = {
  country: string
  phone: string
}
export type PhoneInputProps = {
  icon?: ReactNode
  isDisabled?: boolean
  isValid?: boolean
  label: string
  placeholder?: string
  supportingText?: string
  onChange: (value: PhoneInputValue) => void
  onBlur: () => void
  value: PhoneInputValue
  style?: StyleProp<ViewStyle>
}
