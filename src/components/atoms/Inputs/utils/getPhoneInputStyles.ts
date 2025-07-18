import { TextStyles } from '@theme'

import { styles } from '../Inputs.styles'

export const getPhoneInputStyles = ({
  isDisabled,
  isValid,
  isFocused,
}: {
  isDisabled: boolean
  isValid: boolean
  isFocused: boolean
}) =>
  [
    styles.phoneInputText,
    styles.textEnabled,
    TextStyles.main_l,
    isDisabled && styles.textDisabled,
    !isDisabled && !isFocused && !isValid && styles.textError,
  ].filter(Boolean)
