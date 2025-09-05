import {
  ModalBorderDivideImg,
  ModalBorderMinusImg,
  ModalBorderMultiplyImg,
  ModalBorderPlusImg,
} from '@assets/images'
import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { OPERATOR } from '@types'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, { FC, memo, useCallback, useMemo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { styles } from './OptionCard.styles'
import { OptionCardProps } from './OptionCard.types'

const BG_BY_OPERATOR = {
  [OPERATOR.Minus]: ModalBorderMinusImg,
  [OPERATOR.Plus]: ModalBorderPlusImg,
  [OPERATOR.Multiply]: ModalBorderMultiplyImg,
  [OPERATOR.Division]: ModalBorderDivideImg,
} as const

const GRADIENT_BY_OPERATOR: Record<
  OPERATOR,
  [string, string, ...Array<string>]
> = {
  [OPERATOR.Minus]: [
    COLORS.roofTerracotta70,
    COLORS.gradientRed_3,
    COLORS.gradientRed_3,
    COLORS.gradientRed_2,
    COLORS.roofTerracotta70,
  ],
  [OPERATOR.Plus]: [
    COLORS.green70,
    COLORS.green90,
    COLORS.gradientGreen_3,
    COLORS.gradientGreen_2,
    COLORS.green70,
  ],
  [OPERATOR.Multiply]: [
    COLORS.purple70,
    COLORS.purple,
    COLORS.gradientPurple_2,
    COLORS.purple70,
  ],
  [OPERATOR.Division]: [
    COLORS.blue70,
    COLORS.gradientBlue_4,
    COLORS.gradientBlue_4,
    COLORS.blue,
    COLORS.blue70,
  ],
}

const PLACEHOLDER_BY_OPERATOR: Record<OPERATOR, string> = {
  [OPERATOR.Minus]: COLORS.gradientRed_2,
  [OPERATOR.Plus]: COLORS.green80,
  [OPERATOR.Multiply]: COLORS.purple60,
  [OPERATOR.Division]: COLORS.blue70,
}

const OptionCard: FC<OptionCardProps> = ({ onPress, value, operator }) => {
  const backgroundImage = useMemo(() => BG_BY_OPERATOR[operator], [operator])
  const backgroundGradient = useMemo(
    () => GRADIENT_BY_OPERATOR[operator],
    [operator]
  )
  const placeholder = useMemo(
    () => PLACEHOLDER_BY_OPERATOR[operator],
    [operator]
  )

  const [bgReady, setBgReady] = useState(false)
  const handleLoaded = useCallback(() => setBgReady(true), [])

  return (
    <View style={styles.shadowContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          {
            transform: [{ scale: pressed ? 0.95 : 1 }],
            borderWidth: pressed ? 4 : 3,
          },
        ]}
      >
        <View style={styles.imageBackground}>
          <Image
            cachePolicy="memory-disk"
            contentFit="cover"
            onError={handleLoaded}
            onLoadEnd={handleLoaded}
            priority="high"
            source={backgroundImage}
            style={[StyleSheet.absoluteFill, { backgroundColor: placeholder }]}
            transition={120}
          />

          <LinearGradient
            colors={backgroundGradient}
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 0 }}
            style={[styles.contentContainer, { opacity: Number(bgReady) }]}
          >
            <OutlinedText fontSize={50}>{operator}</OutlinedText>
            <OutlinedText fontSize={50}>{`${value}`}</OutlinedText>
          </LinearGradient>
        </View>
      </Pressable>
    </View>
  )
}

export default memo(OptionCard)
