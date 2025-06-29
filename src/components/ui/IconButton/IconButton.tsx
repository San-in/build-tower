import { styles } from '@components/ui/IconButton/IconButton.styles'
import { IconButtonProps } from '@components/ui/IconButton/IconButton.types'
import { OutlinedText } from '@components/ui/OutlinedText'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const IconButton = ({
  onPress,
  icon,
  style,
  pressedStyles,
  labelStyles = {},
  label = '',
  labelSize = 12,
  isDisabled = false,
}: IconButtonProps) => (
  <View style={styles.container}>
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconContainer,
        style,
        pressed && styles.iconContainerPressed,
        pressed && pressedStyles,
      ]}
    >
      {isDisabled && <View style={styles.disableShadow} />}
      {icon}
    </Pressable>

    {label && (
      <View style={styles.labelContainer}>
        {isDisabled ? (
          <Text>🔒</Text>
        ) : (
          <OutlinedText fontSize={labelSize} style={labelStyles}>
            {label}
          </OutlinedText>
        )}
      </View>
    )}
  </View>
)

export default IconButton
