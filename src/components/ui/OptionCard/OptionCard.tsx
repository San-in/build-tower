import { styles } from '@components/ui/OptionCard/OptionCard.styles'
import { OutlinedText } from '@components/ui/OutlinedText'
import { COLORS } from '@theme'
import { OPERATOR } from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import React, { FC } from 'react'
import { ImageBackground, Pressable, View } from 'react-native'

import { OptionCardProps } from './OptionCard.types'

const OptionCard: FC<OptionCardProps> = ({ onPress, value, operator }) => {
  const backgroundImage = {
    [OPERATOR.Minus]: require('../../../../assets/images/modal-border-minus.png'),
    [OPERATOR.Plus]: require('../../../../assets/images/modal-border-plus.png'),
    [OPERATOR.Multiply]: require('../../../../assets/images/modal-border-multiply.png'),
    [OPERATOR.Division]: require('../../../../assets/images/modal-border-divide.png'),
  }[operator]

  const backgroundGradient: readonly [string, string, ...Array<string>] = {
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
  }[operator] as [string, string, ...Array<string>]

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
        <ImageBackground
          resizeMode={'cover'}
          source={backgroundImage}
          style={styles.imageBackground}
        >
          <LinearGradient
            colors={backgroundGradient}
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 0 }}
            style={styles.contentContainer}
          >
            <OutlinedText fontSize={50}>{operator}</OutlinedText>
            <OutlinedText fontSize={50}>{`${value}`}</OutlinedText>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </View>
  )
}

export default OptionCard
