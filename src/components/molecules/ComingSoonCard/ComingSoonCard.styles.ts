import { LEVEL_CARD_SCALE, LEVEL_CARD_WIDTH } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    aspectRatio: 0.58,
    borderColor: COLORS.gradientGrey_3,
    borderRadius: formatTabletElementsSize(15, LEVEL_CARD_SCALE),
    borderWidth: formatTabletElementsSize(5, LEVEL_CARD_SCALE),
    justifyContent: 'center',
    overflow: 'hidden',
    width: LEVEL_CARD_WIDTH,
  },
  disabled: { opacity: 0.5 },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    alignItems: 'center',
    gap: formatTabletElementsSize(4, 1.5),
    paddingHorizontal: formatTabletElementsSize(15),
  },
})
