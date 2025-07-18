import { TextStyles } from '@theme'

import { styles } from '../Inputs.styles'

export const getInputStyles = ({
  isDisabled,
  isValid,
  isFocused,
}: {
  isDisabled: boolean
  isValid: boolean
  isFocused: boolean
}) =>
  [
    styles.input,
    TextStyles.main_l,
    isDisabled && styles.inputDisabled,
    !isDisabled && isFocused && isValid && styles.inputFocused,
    !isDisabled && isFocused && !isValid && styles.inputFocusedInvalid,
    !isDisabled && !isFocused && !isValid && styles.inputInvalid,
  ].filter(Boolean)
