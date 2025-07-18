import { GestureResponderEvent } from 'react-native'

export type CheckBoxProps = {
  isChecked: boolean
  onChange: (event: GestureResponderEvent) => void
  label?: string
  isValid: boolean
}
