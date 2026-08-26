import { LEVEL_CARD_SCALE, LEVEL_CARD_WIDTH } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // Keeps children at their own width. Without it the column stretches the
  // bordered wrapper to the widest child, so the border stops hugging the card.
  container: { alignItems: 'center' },
  greenBorder: { borderColor: COLORS.gradientGreen_1 },
  greenShadow: { shadowColor: COLORS.gradientGreen_5 },
  infoMessageContainer: {
    alignItems: 'center',
    marginTop: formatTabletElementsSize(10),
    maxWidth: LEVEL_CARD_WIDTH,
  },
  orangeBorder: { borderColor: COLORS.gradientTerracotta_1 },
  orangeShadow: { shadowColor: COLORS.gradientTerracotta_5 },
  purpleBorder: { borderColor: COLORS.gradientPurple_1 },
  purpleShadow: { shadowColor: COLORS.gradientPurple_5 },
  selectedWrapper: {
    borderColor: COLORS.codeGrey,
    borderWidth: formatTabletElementsSize(2, LEVEL_CARD_SCALE),
  },
  wrapper: { borderRadius: formatTabletElementsSize(18, LEVEL_CARD_SCALE) },
})
