import { styles } from '@components/ui/IconButton/IconButton.styles'
import { IconButtonProps } from '@components/ui/IconButton/IconButton.types'
import React from 'react'
import { Pressable } from 'react-native'

const IconButton = ({
  onPress,
  icon,
  style,
  pressedStyles,
}: IconButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.iconContainer,
      style,
      pressed && styles.iconContainerPressed,
      pressed && pressedStyles,
    ]}
  >
    {icon}
  </Pressable>
)

export default IconButton
