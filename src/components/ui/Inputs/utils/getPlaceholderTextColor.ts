import { COLORS } from '@theme'

export const getPlaceholderTextColor = ({
  isDisabled,
  isFocused,
}: {
  isDisabled: boolean
  isFocused: boolean
}) =>
  [
    isDisabled && COLORS.codeGrey40,
    !isDisabled && isFocused && COLORS.codeGrey,
  ].filter(Boolean)[0] || COLORS.codeGrey50
