import { styles } from '@components/Inputs/Inputs.styles'
import { TextStyles } from '@theme'
import { Animated } from 'react-native'

export const getLabelStyles = ({
  isDisabled,
  isFocused,
  isValid,
  animatedLabel,
  isPhoneLabel = false,
}: {
  isDisabled: boolean
  isFocused: boolean
  isValid: boolean
  animatedLabel: Animated.Value
  isPhoneLabel?: boolean
}) => {
  const labelPosition = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [20, isPhoneLabel ? -11 : -8],
  })

  const labelTransparency = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  return [
    styles.label,
    isPhoneLabel && styles.phoneLabel,
    TextStyles.main_s,
    isDisabled && styles.labelDisabled,
    !isDisabled && isFocused && isValid && styles.labelFocused,
    !isDisabled && !isValid && !isDisabled && styles.labelInvalid,
    { top: labelPosition, opacity: labelTransparency },
  ].filter(Boolean)
}
