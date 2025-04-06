import { styles } from '@components/ui/Inputs/Inputs.styles'
import { TextStyles } from '@theme'

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
