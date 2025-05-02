import { FC, useEffect, useRef, useState } from 'react'
import { Pressable, View, Animated, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ButtonProps } from './Button.types'
import { OutlinedText } from '@components/ui/OutlinedText'
import { styles } from './Button.styles'
import { COLORS } from '@theme'
import { BUTTON_TYPE } from '@types'

const Button: FC<ButtonProps> = ({
  title,
  isDisabled = false,
  style,
  onPress,
  type = BUTTON_TYPE.Success,
  textSize = 20,
  ...props
}) => {
  const borderAnim = useRef(new Animated.Value(0)).current
  const [gradientIndex, setGradientIndex] = useState(0)

  const gradients: readonly [string, string, ...string[]][] = {
    [BUTTON_TYPE.Success]: [
      [
        COLORS.gradientGreen_1,
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_5,
      ],
      [
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_1,
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_4,
      ],
      [
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_1,
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_3,
      ],
      [
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_1,
        COLORS.gradientGreen_2,
      ],
      [
        COLORS.gradientGreen_5,
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_1,
      ],
      [
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_5,
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_2,
      ],
      [
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_5,
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_3,
      ],
      [
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_5,
        COLORS.gradientGreen_4,
      ],
      [
        COLORS.gradientGreen_1,
        COLORS.gradientGreen_2,
        COLORS.gradientGreen_3,
        COLORS.gradientGreen_4,
        COLORS.gradientGreen_5,
      ],
    ],
    [BUTTON_TYPE.Warning]: [
      [
        COLORS.gradientOrange_1,
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_5,
      ],
      [
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_1,
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_4,
      ],
      [
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_1,
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_3,
      ],
      [
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_1,
        COLORS.gradientOrange_2,
      ],
      [
        COLORS.gradientOrange_5,
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_1,
      ],
      [
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_5,
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_2,
      ],
      [
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_5,
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_3,
      ],
      [
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_5,
        COLORS.gradientOrange_4,
      ],
      [
        COLORS.gradientOrange_1,
        COLORS.gradientOrange_2,
        COLORS.gradientOrange_3,
        COLORS.gradientOrange_4,
        COLORS.gradientOrange_5,
      ],
    ],
    [BUTTON_TYPE.Error]: [
      [
        COLORS.gradientRed_1,
        COLORS.gradientRed_2,
        COLORS.gradientRed_3,
        COLORS.gradientRed_4,
        COLORS.gradientRed_5,
      ],
      [
        COLORS.gradientRed_2,
        COLORS.gradientRed_1,
        COLORS.gradientRed_2,
        COLORS.gradientRed_3,
        COLORS.gradientRed_4,
      ],
      [
        COLORS.gradientRed_3,
        COLORS.gradientRed_2,
        COLORS.gradientRed_1,
        COLORS.gradientRed_2,
        COLORS.gradientRed_3,
      ],
      [
        COLORS.gradientRed_4,
        COLORS.gradientRed_3,
        COLORS.gradientRed_2,
        COLORS.gradientRed_1,
        COLORS.gradientRed_2,
      ],
      [
        COLORS.gradientRed_5,
        COLORS.gradientRed_4,
        COLORS.gradientRed_3,
        COLORS.gradientRed_2,
        COLORS.gradientRed_1,
      ],
      [
        COLORS.gradientRed_4,
        COLORS.gradientRed_5,
        COLORS.gradientRed_4,
        COLORS.gradientRed_3,
        COLORS.gradientRed_2,
      ],
      [
        COLORS.gradientRed_3,
        COLORS.gradientRed_4,
        COLORS.gradientRed_5,
        COLORS.gradientRed_4,
        COLORS.gradientRed_3,
      ],
      [
        COLORS.gradientRed_2,
        COLORS.gradientRed_3,
        COLORS.gradientRed_4,
        COLORS.gradientRed_5,
        COLORS.gradientRed_4,
      ],
      [
        COLORS.gradientRed_1,
        COLORS.gradientRed_2,
        COLORS.gradientRed_3,
        COLORS.gradientRed_4,
        COLORS.gradientRed_5,
      ],
    ],
  }[type] as [string, string, ...string[]][]

  const runChangeGradient = () => {
    for (let i = 0; i < gradients.length; i += 1) {
      setTimeout(() => {
        setGradientIndex(i)
      }, i * 50)
    }
  }

  const animateBorder = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, -2],
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      runChangeGradient()
    }, 10000)
    return () => clearInterval(intervalId)
  }, [])

  const currentColors = gradients[gradientIndex]

  return (
    <Pressable
      {...props}
      onLongPress={() => runChangeGradient()}
      onPressIn={() => {
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }).start()
      }}
      onPressOut={() => {
        Animated.timing(borderAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start()
      }}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }: { pressed: boolean }) => [styles.container, style]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: animateBorder,
          bottom: animateBorder,
          borderRadius: 14,
          borderWidth: 6,
          borderColor: '#202020',
          zIndex: 0,
        }}
      />

      <Animated.View
        style={[StyleSheet.absoluteFill, { borderRadius: 14, zIndex: 1 }]}
      >
        {currentColors && (
          <LinearGradient
            colors={
              isDisabled
                ? [
                    COLORS.gradientGrey_1,
                    COLORS.gradientGrey_2,
                    COLORS.gradientGrey_3,
                    COLORS.gradientGrey_4,
                    COLORS.gradientGrey_2,
                  ]
                : currentColors
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          />
        )}
      </Animated.View>

      <View style={{ zIndex: 2 }}>
        <OutlinedText fontSize={textSize}>{title}</OutlinedText>
      </View>
    </Pressable>
  )
}

export default Button
