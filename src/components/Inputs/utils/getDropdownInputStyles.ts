import { styles } from '@components/Inputs/Inputs.styles'

export const getDropdownInputStyles = ({
  isDisabled,
  isValid,
  isFocused,
  isPhoneInput = false,
}: {
  isDisabled: boolean
  isValid: boolean
  isFocused: boolean
  isPhoneInput?: boolean
}) =>
  [
    !isPhoneInput && styles.input,
    isDisabled && styles.inputDisabled,
    !isDisabled && isFocused && isValid && styles.inputFocused,
    !isDisabled && isFocused && !isValid && styles.inputFocusedInvalid,
    !isDisabled && !isFocused && !isValid && styles.inputInvalid,
  ].filter(Boolean)
