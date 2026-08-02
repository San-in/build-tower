import { OutlinedText } from '@components/atoms/OutlinedText'
import { POWER_UP_GRADE, POWER_UP_TYPE } from '@types'
import { formatTabletElementsSize } from '@utils'
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
    size = formatTabletElementsSize(30),
    style,
    color = POWER_UP_GRADE.Base,
    isDisabled,
  }: PowerUpButtonProps) => {
    const k = size / formatTabletElementsSize(30)
    const textSize =
      type === POWER_UP_TYPE.AddExtraStep
        ? formatTabletElementsSize(size, 1.5) / 2.5
        : formatTabletElementsSize(size, 1.2) / 2

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
        {Boolean(count) && (
          <View style={styles.powerUpCounter}>
            <OutlinedText fontSize={formatTabletElementsSize(11) * k}>
              {String(count)}
            </OutlinedText>
          </View>
        )}
      </Pressable>
    )
  }
)

export default PowerUpButton
