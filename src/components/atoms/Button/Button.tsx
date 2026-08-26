import { OutlinedText } from '@components/atoms/OutlinedText'
import { BUTTON_TYPE } from '@types'
import { formatTabletElementsSize, playSfx } from '@utils'
import { FC, memo, useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Easing } from 'react-native-reanimated'

import { styles } from './Button.styles'
import { ButtonProps } from './Button.types'
import ButtonGradient, { ButtonGradientHandle } from './ButtonGradient'

const Button: FC<ButtonProps> = ({
  title,
  isDisabled = false,
  style,
  onPress,
  type = BUTTON_TYPE.Success,
  textSize = formatTabletElementsSize(20),
  buttonContainerStyle,
  textIcon,
  textIconStyle,
  numberOfLines,
  withSound = true,
  titleOffset,
  ...props
}) => {
  const borderAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const gradientRef = useRef<ButtonGradientHandle>(null)

  const handleLongPress = useCallback(() => {
    gradientRef.current?.sweep()
  }, [])

  const handlePressIn = useCallback(() => {
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start()
  }, [borderAnim])

  const handlePressOut = useCallback(() => {
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start()
  }, [borderAnim])

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (withSound) {
        playSfx('button')
      }
      onPress?.(event)
    },
    [onPress, withSound]
  )

  const animateBorder = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, -2],
  })

  useEffect(() => {
    let isCancelled = false

    const pulse = () => {
      if (isDisabled) {
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
  }, [isDisabled, pulseAnim])

  return (
    <Animated.View style={[{ transform: [{ scale: pulseAnim }] }, style]}>
      <Pressable
        {...props}
        disabled={isDisabled}
        onLongPress={handleLongPress}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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
          <ButtonGradient
            isDisabled={isDisabled}
            ref={gradientRef}
            type={type}
          />
        </Animated.View>
        <View style={styles.titleContainer}>
          <OutlinedText
            fontSize={textSize}
            numberOfLines={numberOfLines}
            offset={titleOffset}
          >
            {title}
          </OutlinedText>
          {textIcon && (
            <Text allowFontScaling={false} style={textIconStyle}>
              {textIcon}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default memo(Button)
