import { styles } from '@components/ui/Inputs/Inputs.styles'
import {
  getInputStyles,
  getLabelStyles,
  getPlaceholderTextColor,
  getSupportingTextStyles,
} from '@components/ui/Inputs/utils'
import { COLORS } from '@theme'
import { FC, useEffect, useRef, useState } from 'react'
import { Animated, Easing, Text, TextInput, View } from 'react-native'

import { InputProps } from './Input.types'

const Input: FC<InputProps> = ({
  label,
  placeholder = '',
  isValid = true,
  isDisabled = false,
  supportingText = '',
  icon,
  value,
  onBlur = () => {},
  onChange,
  onFocus = () => {},
  style = {},
  multiline = false,
  textContentType = 'none',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current
  const [isScrollEnabled, setIsScrollEnabled] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus()
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur()
    if (!value) {
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start()
    }
  }

  useEffect(() => {
    if (value) {
      Animated.timing(animatedLabel, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start()
    }
  }, [animatedLabel, value])

  useEffect(() => {
    if (value?.length > 200) {
      setIsScrollEnabled(true)
    }
  }, [value])

  return (
    <View style={[styles.container, style]}>
      {!!icon && <View style={styles.iconContainer}>{icon}</View>}
      <View
        style={[styles.inputContainer, !isFocused && styles.transparentBorder]}
      >
        <Animated.Text
          style={getLabelStyles({
            isDisabled,
            isFocused,
            isValid,
            animatedLabel,
          })}
        >
          {label}
        </Animated.Text>
        <TextInput
          editable={!isDisabled}
          multiline={multiline}
          onBlur={handleBlur}
          onChangeText={onChange}
          onFocus={handleFocus}
          placeholder={!isFocused ? placeholder : ''}
          placeholderTextColor={getPlaceholderTextColor({
            isFocused,
            isDisabled,
          })}
          scrollEnabled={isScrollEnabled}
          selectionColor={isValid ? COLORS.tango : COLORS.roofTerracotta}
          style={getInputStyles({ isDisabled, isFocused, isValid })}
          textContentType={textContentType}
          value={value}
          {...props}
        />
        {!!supportingText && (
          <Text style={getSupportingTextStyles({ isDisabled, isValid })}>
            {supportingText}
          </Text>
        )}
      </View>
    </View>
  )
}

export default Input
