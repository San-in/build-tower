import { ArrowDropUpIcon, CheckIcon } from '@assets/icons'
import { styles } from '@components/Inputs/Inputs.styles'
import { PhoneInputProps } from '@components/Inputs/PhoneInput/PhoneInput.types'
import {
  getDropdownInputStyles,
  getLabelStyles,
  getPhoneInputStyles,
  getPlaceholderTextColor,
  getRotateStyle,
  getSupportingTextStyles,
} from '@components/Inputs/utils'
import { COUNTRY_LIST } from '@constants'
import { COLORS, TextStyles } from '@theme'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const PhoneInput: FC<PhoneInputProps> = ({
  label,
  placeholder = '',
  isValid = true,
  isDisabled = false,
  supportingText = '',
  icon,
  onChange,
  onBlur,
  value,
  style,
}) => {
  const selectedCountry = useMemo(
    () => COUNTRY_LIST.find((country) => country.id === value?.country),
    [value?.country]
  )

  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const rotation = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current

  const handleFocus = () => {
    setIsFocused(true)
    setIsOpen(false)
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur()
  }
  const handleToggleDropdown = () => {
    setIsFocused(!isOpen)
    setIsOpen((prevState) => !prevState)
    Keyboard.dismiss()
  }

  const handleSelect = (id: string) => {
    onChange({ ...value, country: id })
    setIsOpen(false)
    setIsFocused(false)
  }

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
      toValue: isFocused || value?.phone ? 1 : 0,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [isFocused, value?.phone, animatedLabel])

  return (
    <View style={[styles.container, style]}>
      {!!icon && <View style={styles.phoneIconContainer}>{icon}</View>}
      <View style={styles.inputContainer}>
        <View style={!isFocused && styles.transparentBorder}>
          <View
            style={[
              styles.phoneInputContainer,
              getDropdownInputStyles({
                isFocused,
                isDisabled,
                isValid,
                isPhoneInput: true,
              }),
            ]}
          >
            <TouchableOpacity
              disabled={isDisabled}
              onPress={handleToggleDropdown}
              style={styles.selectCountryContainer}
            >
              {selectedCountry && <selectedCountry.flag />}
              <Animated.View
                style={[styles.arrowDropIcon, getRotateStyle(rotation)]}
              >
                <ArrowDropUpIcon />
              </Animated.View>
              <View style={styles.separateLine} />
            </TouchableOpacity>
            <View style={styles.countyCodeContainer}>
              <Text style={[styles.textEnabled, TextStyles.main_l]}>
                {selectedCountry?.code}
              </Text>
              <Animated.Text
                style={getLabelStyles({
                  isDisabled,
                  isFocused,
                  isValid,
                  animatedLabel,
                  isPhoneLabel: true,
                })}
              >
                {label}
              </Animated.Text>
              <TextInput
                editable={!isDisabled}
                keyboardType={'number-pad'}
                onBlur={handleBlur}
                onChangeText={(phone) => onChange({ ...value, phone })}
                onFocus={handleFocus}
                placeholder={!isFocused ? placeholder : ''}
                placeholderTextColor={getPlaceholderTextColor({
                  isFocused,
                  isDisabled,
                })}
                selectionColor={isValid ? COLORS.tango : COLORS.roofTerracotta}
                style={[
                  getPhoneInputStyles({ isDisabled, isFocused, isValid }),
                ]}
                value={value?.phone?.trim()}
              />
            </View>
            {isOpen && (
              <View style={[styles.dropdown, styles.phoneDropdown]}>
                <ScrollView contentContainerStyle={styles.dropdownContainer}>
                  {COUNTRY_LIST.map((item) => {
                    const isSelected = selectedCountry?.id === item.id
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleSelect(item.id)}
                        style={[
                          styles.optionCountry,
                          isSelected && styles.optionSelected,
                        ]}
                      >
                        <item.flag />
                        <Text style={TextStyles.main_l}>{item.name}</Text>
                        {isSelected && (
                          <View style={styles.checkIconContainer}>
                            <CheckIcon />
                          </View>
                        )}
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        {!!supportingText && !isOpen && (
          <Text style={getSupportingTextStyles({ isDisabled, isValid })}>
            {supportingText}
          </Text>
        )}
      </View>
    </View>
  )
}

export default PhoneInput
