import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  greenBorder: { borderColor: COLORS.gradientGreen_1 },
  greenShadow: { shadowColor: COLORS.gradientGreen_5 },
  infoMessageContainer: {
    alignItems: 'center',
    marginTop: 10,
    maxWidth: 200,
  },
  orangeBorder: { borderColor: COLORS.gradientTerracotta_1 },
  orangeShadow: { shadowColor: COLORS.gradientTerracotta_5 },
  purpleBorder: { borderColor: COLORS.gradientPurple_1 },
  purpleShadow: { shadowColor: COLORS.gradientPurple_5 },
  selectedWrapper: { borderColor: COLORS.codeGrey, borderWidth: 2 },
  wrapper: { borderRadius: 18 },
})
