import { ExclamationRoundIcon } from '@assets/icons'
import { IconButtonProps } from '@components/atoms/IconButton/IconButton.types'
import { OutlinedText } from '@components/atoms/OutlinedText'
import { MotiView } from 'moti'
import React, { memo } from 'react'
import { Pressable, Text, View } from 'react-native'

import { styles } from './IconButton.styles'

const NOTIFY_ICON_SIZE = 20

const IconButton = ({
  onPress,
  icon,
  style,
  pressedStyles,
  labelStyles = {},
  label = '',
  labelSize = 10,
  isDisabled = false,
  withNotify = false,
  numberOfLines,
}: IconButtonProps) => (
  <View style={styles.container}>
    <MotiView
      animate={{ opacity: Number(withNotify) }}
      style={styles.exclamationIconContainer}
      transition={{
        type: 'timing',
        duration: 100,
      }}
    >
      <ExclamationRoundIcon
        height={NOTIFY_ICON_SIZE}
        width={NOTIFY_ICON_SIZE}
      />
    </MotiView>
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconContainer,
        style,
        withNotify && styles.containerWithNotify,
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
          <Text style={styles.lock}>🔒</Text>
        ) : (
          <OutlinedText
            adjustsFontSizeToFit={true}
            fontSize={labelSize}
            numberOfLines={numberOfLines}
            style={labelStyles}
          >
            {label}
          </OutlinedText>
        )}
      </View>
    )}
  </View>
)

export default memo(IconButton)
