import {
  DEFlagIcon,
  ESFlagIcon,
  FRFlagIcon,
  UAFlagIcon,
  UKFlagIcon,
} from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { styles } from '@components/molecules/LanguageSelector/LanguageSelector.styles'
import { LanguageSelectorProps } from '@components/molecules/LanguageSelector/LanguageSelector.types'
import { COLORS } from '@theme'
import { LANGUAGES } from '@types'
import { AnimatePresence, MotiView } from 'moti'
import React, { FC, memo, useMemo, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'

const LANGUAGE_OPTIONS = [
  { value: LANGUAGES.EN, label: 'EN', Icon: UKFlagIcon },
  { value: LANGUAGES.UK, label: 'UK', Icon: UAFlagIcon },
  { value: LANGUAGES.DE, label: 'DE', Icon: DEFlagIcon },
  { value: LANGUAGES.ES, label: 'ES', Icon: ESFlagIcon },
  { value: LANGUAGES.FR, label: 'FR', Icon: FRFlagIcon },
]

const DEFAULT_LANGUAGE = {
  value: LANGUAGES.EN,
  label: 'EN',
  Icon: UKFlagIcon,
}
const ITEM_HEIGHT = 34
const VERTICAL_PADDING = 8
const GAP_BELOW = 6
const DROPDOWN_TOP_OFFSET = 15

const LanguageSelector: FC<LanguageSelectorProps> = ({
  value,
  onSelect,
  visibleCount = 5,
  containerStyle = {},
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isWarningVisible, setIsWarningVisible] = useState(false)

  const currentLanguageData = useMemo(
    () => LANGUAGE_OPTIONS.find((l) => l.value === value) ?? DEFAULT_LANGUAGE,
    [value]
  )
  const CurrentIcon = useMemo(
    () => currentLanguageData?.Icon,
    [currentLanguageData]
  )

  const totalDropdownHeight = useMemo(
    () =>
      ITEM_HEIGHT * Math.min(visibleCount, LANGUAGE_OPTIONS.length) +
      VERTICAL_PADDING,
    [visibleCount]
  )

  const handleSelect = (lang: LANGUAGES) => {
    onSelect(lang)
    setIsOpen(false)
  }

  return (
    <>
      <MotiView
        animate={{
          marginBottom: isOpen
            ? totalDropdownHeight - GAP_BELOW - DROPDOWN_TOP_OFFSET
            : 0,
        }}
        transition={{
          type: 'timing',
          duration: 140,
        }}
      >
        <View style={[styles.wrapper, containerStyle]}>
          <OutlinedText fontSize={20}>Language: </OutlinedText>

          <View style={styles.dropdownWrapper}>
            <AnimatePresence>
              {!isOpen ? (
                <>
                  <Pressable
                    hitSlop={8}
                    onPress={() => {
                      if (isDisabled) {
                        setIsWarningVisible((prev) => !prev)
                        return
                      }
                      setIsOpen((prev) => !prev)
                    }}
                    style={({ pressed }) => [
                      styles.currentBtn,
                      isDisabled && [
                        styles.currentBtnDisabled,
                        {
                          transform: [{ scale: pressed ? 0.9 : 1 }],
                          borderColor: isWarningVisible
                            ? COLORS.roofTerracotta
                            : 'transparent',
                        },
                      ],
                    ]}
                  >
                    <CurrentIcon />
                    <OutlinedText fontSize={20}>
                      {currentLanguageData.label}
                    </OutlinedText>
                  </Pressable>
                </>
              ) : (
                <MotiView
                  animate={{ opacity: 1, translateY: 0, scale: 1 }}
                  exit={{ opacity: 0, translateY: -6, scale: 0.98 }}
                  from={{ opacity: 0, translateY: -6, scale: 0.98 }}
                  style={[styles.dropdown, { maxHeight: totalDropdownHeight }]}
                  transition={{ type: 'timing', duration: 140 }}
                >
                  <ScrollView>
                    {LANGUAGE_OPTIONS.slice(0, visibleCount).map(
                      (option, idx) => {
                        const Icon = option.Icon
                        const isActive = option.value === value
                        return (
                          <MotiView
                            animate={{ opacity: 1, translateY: 0 }}
                            from={{ opacity: 0, translateY: -4 }}
                            key={option.value}
                            transition={{
                              type: 'timing',
                              duration: 110,
                              delay: 30 + idx * 20,
                            }}
                          >
                            <Pressable
                              onPress={() => handleSelect(option.value)}
                              style={[
                                styles.item,
                                { height: ITEM_HEIGHT },
                                isActive && styles.itemActive,
                              ]}
                            >
                              <Icon />
                              <OutlinedText fontSize={18}>
                                {option.label}
                              </OutlinedText>
                            </Pressable>
                          </MotiView>
                        )
                      }
                    )}
                  </ScrollView>
                </MotiView>
              )}
            </AnimatePresence>
          </View>
        </View>
      </MotiView>
      <MotiView
        animate={{ opacity: Number(isWarningVisible) }}
        style={styles.warningText}
        transition={{
          type: 'timing',
          duration: 110,
        }}
      >
        <OutlinedText
          color={COLORS.gradientOrange_1}
          fontSize={12}
          strokeColor={COLORS.codeGrey}
        >
          Temporary unavailable
        </OutlinedText>
      </MotiView>
    </>
  )
}

export default memo(LanguageSelector)
