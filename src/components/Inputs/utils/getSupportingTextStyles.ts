import { styles } from '@components/Inputs/Inputs.styles'
import { TextStyles } from '@theme'

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
