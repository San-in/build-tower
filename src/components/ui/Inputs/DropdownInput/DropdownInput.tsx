import {
  DropdownInputProps,
  DropdownOption,
} from '@components/ui/Inputs/DropdownInput/DropdownInput.types'
import { styles } from '@components/ui/Inputs/Inputs.styles'
import {
  getDropdownInputStyles,
  getDropdownLabelStyles,
  getLabelStyles,
  getRotateStyle,
  getSupportingTextStyles,
} from '@components/ui/Inputs/utils'
import { TextStyles } from '@theme'
import { FC, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ArrowDropUpIcon, CheckIcon } from '@assets/icons'

const DropdownInput: FC<DropdownInputProps> = ({
  label,
  options,
  isValid = true,
  isDisabled = false,
  supportingText = '',
  icon,
  value,
  onChange,
  onBlur,
  placeholder = '',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current
  const rotation = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  const animatedHeight = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  const [displayedName, setDisplayedName] = useState('')

  const handleToggleDropdown = () => {
    setIsFocused(!isOpen)
    setIsOpen((prevState) => !prevState)
    Keyboard.dismiss()
    if (isOpen) {
      onBlur()
    }
  }

  const handleSelect = (item: DropdownOption) => {
    const { id } = item
    onChange(id)
    setIsOpen(false)
    setIsFocused(false)
    onBlur()
  }

  useEffect(() => {
    if (value) {
      const newName = options?.find(({ id }) => id === value)
      setDisplayedName(newName?.value || '')
    }
  }, [value, options])

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isOpen ? 1 : 0,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [isOpen, rotation])

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isOpen || value ? 1 : 0,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [isOpen, value, animatedLabel])

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: (!isOpen && isValid && 60) || (!isOpen && !isValid && 80) || 230,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [isOpen, isValid, animatedHeight])

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
        <Animated.View style={{ height: animatedHeight }}>
          <TouchableOpacity
            disabled={isDisabled}
            onPress={handleToggleDropdown}
            style={getDropdownInputStyles({ isDisabled, isFocused, isValid })}
          >
            <View>
              <Text
                style={getDropdownLabelStyles({ value, isDisabled, isValid })}
              >
                {isOpen ? displayedName || '' : displayedName || placeholder}
              </Text>
            </View>
            <Animated.View
              style={[styles.arrowDropIcon, getRotateStyle(rotation)]}
            >
              <ArrowDropUpIcon />
            </Animated.View>
          </TouchableOpacity>
          {!!supportingText && !isOpen && (
            <Text style={getSupportingTextStyles({ isDisabled, isValid })}>
              {supportingText}
            </Text>
          )}
        </Animated.View>
        {isOpen && options?.length && (
          <View style={styles.dropdown}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              persistentScrollbar={true}
              style={styles.scrollViewContainer}
            >
              {options.map((item) => {
                const isSelected = value === item.id
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelect(item)}
                    style={[styles.option, isSelected && styles.optionSelected]}
                  >
                    {isSelected && <CheckIcon />}
                    <Text style={TextStyles.main_l}>{item.value}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  )
}

export default DropdownInput
