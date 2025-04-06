import { styles } from '@components/ui/Inputs/Inputs.styles'
import { TextStyles } from '@theme'

export const getDropdownLabelStyles = ({
  isDisabled,
  value,
  isValid,
}: {
  isDisabled: boolean
  value: string
  isValid: boolean
}) =>
  [
    TextStyles.main_l,
    isDisabled && styles.textDisabled,
    !isDisabled && !value && isValid && styles.textPlaceholder,
    !isDisabled && !value && !isValid && styles.textEnabled,
    !isDisabled && !!value && isValid && styles.textEnabled,
    !isDisabled && !!value && !isValid && styles.textError,
  ].filter(Boolean)
