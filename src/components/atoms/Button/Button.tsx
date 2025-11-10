import { gradientsMap } from '@components/atoms/Button/gradinentsMap'
import { OutlinedText } from '@components/atoms/OutlinedText'
import { COLORS } from '@theme'
import { BUTTON_TYPE } from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { Easing } from 'react-native-reanimated'

import { styles } from './Button.styles'
import { ButtonProps } from './Button.types'

const Button: FC<ButtonProps> = ({
  title,
  isDisabled = false,
  style,
  onPress,
  type = BUTTON_TYPE.Success,
  textSize = 20,
  buttonContainerStyle,
  textIcon,
  textIconStyle,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const borderAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current

  const [gradientIndex, setGradientIndex] = useState(0)

  const gradients: ReadonlyArray<[string, string, ...Array<string>]> =
    gradientsMap[type] as Array<[string, string, ...Array<string>]>

  const runChangeGradient = useCallback(() => {
    for (let i = 0; i < gradients.length; i += 1) {
      setTimeout(() => {
        setGradientIndex(i)
      }, i * 50)
    }
  }, [gradients])

  const animateBorder = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, -2],
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      runChangeGradient()
    }, 10000)
    return () => clearInterval(intervalId)
  }, [runChangeGradient])

  useEffect(() => {
    let isCancelled = false

    const pulse = () => {
      if (isDisabled || isPressed) {
        return
      }

      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!isCancelled) {
          pulse()
        }
      })
    }

    pulse()

    return () => {
      isCancelled = true
      pulseAnim.setValue(1)
    }
  }, [isDisabled, isPressed, pulseAnim])

  const currentColors = gradients[gradientIndex]

  return (
    <Animated.View style={[{ transform: [{ scale: pulseAnim }] }, style]}>
      <Pressable
        {...props}
        disabled={isDisabled}
        onLongPress={runChangeGradient}
        onPress={onPress}
        onPressIn={() => {
          setIsPressed(true)
          Animated.timing(borderAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
          }).start()
        }}
        onPressOut={() => {
          setIsPressed(false)
          Animated.timing(borderAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
          }).start()
        }}
        style={({ pressed }) => [
          styles.container,
          buttonContainerStyle,
          pressed && styles.pressedContainer,
        ]}
      >
        <Animated.View
          style={[
            styles.externalBorder,
            {
              right: animateBorder,
              bottom: animateBorder,
            },
          ]}
        />

        <Animated.View
          style={[StyleSheet.absoluteFill, styles.gradientContainer]}
        >
          {currentColors && (
            <LinearGradient
              colors={
                isDisabled
                  ? [
                      COLORS.gradientGrey_1,
                      COLORS.gradientGrey_2,
                      COLORS.gradientGrey_5,
                      COLORS.gradientGrey_3,
                      COLORS.gradientGrey_2,
                    ]
                  : currentColors
              }
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={styles.gradientBackground}
            />
          )}
        </Animated.View>
        <View style={styles.titleContainer}>
          <OutlinedText fontSize={textSize}>{title}</OutlinedText>
          {textIcon && <Text style={textIconStyle}>{textIcon}</Text>}
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default Button
