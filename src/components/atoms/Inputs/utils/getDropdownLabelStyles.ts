import { TextStyles } from '@theme'

import { styles } from '../Inputs.styles'

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
