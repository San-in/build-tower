import { OutlinedText } from '@components/atoms'
import { styles } from '@components/wrappers/ToastWrapper/Toast.styles'
import { COLORS } from '@theme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View } from 'react-native'
import type { BaseToastProps } from 'react-native-toast-message'

const createToast =
  (colors: [string, string, ...Array<string>]) =>
  ({ text1, text2 }: BaseToastProps) => (
    <LinearGradient
      colors={colors}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={styles.toast}
    >
      <View>
        {text1 && <OutlinedText fontSize={16}>{text1}</OutlinedText>}
        {text2 && <OutlinedText fontSize={14}>{text2}</OutlinedText>}
      </View>
    </LinearGradient>
  )

export const toastConfig = {
  success: createToast([
    COLORS.gradientOrange_2,
    COLORS.gradientOrange_4,
    COLORS.gradientOrange_2,
    COLORS.gradientOrange_2,
  ]),
  info: createToast([
    COLORS.gradientBlue_3,
    COLORS.gradientBlue_4,
    COLORS.gradientBlue_3,
    COLORS.gradientBlue_3,
  ]),
  error: createToast([
    COLORS.gradientRed_3,
    COLORS.gradientRed_4,
    COLORS.gradientRed_3,
    COLORS.gradientRed_3,
  ]),
}

export default toastConfig
