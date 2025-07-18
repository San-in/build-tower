import { TextStyles } from '@theme'

import { styles } from '../Inputs.styles'

export const getSupportingTextStyles = ({
  isDisabled,
  isValid,
}: {
  isValid: boolean
  isDisabled: boolean
}) =>
  [
    styles.supportingText,
    TextStyles.main_s,
    isDisabled && styles.supportingTextDisabled,
    !isDisabled && !isValid && styles.supportingTextError,
  ].filter(Boolean)
