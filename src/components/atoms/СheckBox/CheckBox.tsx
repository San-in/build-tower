import { CheckBoxCheckedIcon } from '@assets/icons'
import { CheckBoxProps } from '@components/atoms/СheckBox/CheckBox.types'
import { COLORS, TextStyles } from '@theme'
import React, { FC, memo, useEffect, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'

import { styles } from './CheckBox.styles'

const CheckBox: FC<CheckBoxProps> = ({
  label,
  isChecked = false,
  onChange,
  isValid = true,
}) => {
  const backgroundColorAnim = useRef(new Animated.Value(0)).current
  const borderColorAnim = useRef(new Animated.Value(0)).current

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.white, COLORS.tango],
  })

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [COLORS.vanCleef, COLORS.tango, COLORS.roofTerracotta],
  })

  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: isChecked && isValid ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start()

    Animated.timing(borderColorAnim, {
      toValue: (!isValid && 2) || Number(isChecked),
      duration: 100,
      useNativeDriver: false,
    }).start()
  }, [backgroundColorAnim, borderColorAnim, isChecked, isValid])

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onChange}
        style={({ pressed }) => [
          pressed ? styles.activeBackground : styles.inactiveBackground,
          styles.iconContainer,
        ]}
      >
        <Animated.View
          style={[
            {
              backgroundColor,
              borderColor,
            },
            styles.icon,
          ]}
        >
          <CheckBoxCheckedIcon />
        </Animated.View>
      </Pressable>

      <Text style={[TextStyles.main_m, styles.label]}>{label}</Text>
    </View>
  )
}

export default memo(CheckBox)
