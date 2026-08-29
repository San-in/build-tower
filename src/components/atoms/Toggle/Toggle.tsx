import { COLORS } from '@theme'
import { Haptics } from '@utils'
import { MotiView } from 'moti'
import React, { FC, memo, useCallback } from 'react'
import { Pressable } from 'react-native'

import { styles, THUMB_TRAVEL } from './Toggle.styles'
import { ToggleProps } from './Toggle.types'

const TRANSITION = { type: 'timing', duration: 200 } as const

const Toggle: FC<ToggleProps> = ({
  value,
  onValueChange,
  isDisabled = false,
}) => {
  const handlePress = useCallback(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onValueChange(!value)
  }, [onValueChange, value])

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={handlePress}
    >
      <MotiView
        animate={{
          backgroundColor: value ? COLORS.gradientOrange_1 : COLORS.white,
        }}
        style={styles.track}
        transition={TRANSITION}
      >
        <MotiView
          animate={{
            backgroundColor: value ? COLORS.white : COLORS.gradientOrange_1,
            translateX: value ? THUMB_TRAVEL : 0,
          }}
          style={styles.thumb}
          transition={TRANSITION}
        />
      </MotiView>
    </Pressable>
  )
}

export default memo(Toggle)
