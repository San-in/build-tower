import { OutlinedText } from '@components/atoms/OutlinedText'
import { POWER_UP_GRADE, POWER_UP_TYPE } from '@types'
import React, { memo } from 'react'
import { Pressable, View } from 'react-native'

import { PowerUpIcon } from '../../molecules/PowerUpIcon'
import { styles } from './PowerUpButton.styles'
import { PowerUpButtonProps } from './PowerUpButton.types'

const PowerUpButton = memo(
  ({
    type,
    onPress,
    count,
    size = 30,
    style,
    color = POWER_UP_GRADE.Base,
    isDisabled,
  }: PowerUpButtonProps) => {
    const k = size / 30
    const textSize =
      type === POWER_UP_TYPE.AddExtraStep ? size / 2.2 : size / 1.5

    return (
      <Pressable
        disabled={isDisabled}
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.powerUpPressed, style]}
      >
        <PowerUpIcon
          color={color}
          size={size}
          textSize={textSize}
          type={type}
        />
        {!!count && (
          <View style={[styles.powerUpCounter]}>
            <OutlinedText fontSize={11 * k}>{String(count)}</OutlinedText>
          </View>
        )}
      </Pressable>
    )
  }
)

export default PowerUpButton
