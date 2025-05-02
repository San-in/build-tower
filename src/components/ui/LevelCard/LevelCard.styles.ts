import { StyleSheet } from 'react-native'
import { LEVEL_CARD_WIDTH } from '@constants'
import { COLORS } from '@theme'

export const styles = StyleSheet.create({
  container: {
    width: LEVEL_CARD_WIDTH,
    aspectRatio: 0.58,
    borderWidth: 5,
    borderRadius: 12,
    borderColor: COLORS.codeGrey50,
    position: 'relative',
    opacity: 0.7,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 0,
    backgroundColor: COLORS.thatch70,
  },
  containerSelected: {
    borderWidth: 8,
    opacity: 1,
    elevation: 8,
  },
  greenBorder: { borderColor: COLORS.gradientGreen_1 },
  orangeBorder: { borderColor: COLORS.gradientTerracotta_1 },
  purpleBorder: { borderColor: COLORS.gradientPurple_1 },
  greenShadow: { shadowColor: COLORS.gradientGreen_4 },
  orangeShadow: { shadowColor: COLORS.gradientTerracotta_5 },
  purpleShadow: { shadowColor: COLORS.gradientPurple_5 },
  greyShadow: { shadowColor: COLORS.swirl },
  cardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.codeGrey50,
    zIndex: 5,
  },
  cardContainerAvailable: { backgroundColor: 'transparent' },
  gradientContainer: { height: '100%', width: '100%' },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  imageContainer: { height: '65%', paddingHorizontal: 15, paddingTop: 15 },
  image: { width: '100%', height: '100%', borderRadius: 5 },
  bottomCard: {
    padding: 10,
  },
  levelLabel: { marginBottom: 5 },
  ratingContainer: { flexDirection: 'row', gap: 10 },
})
