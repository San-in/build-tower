import { LEVEL_CARD_WIDTH } from '@constants'
import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  bottomCard: {
    padding: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.codeGrey50,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 5,
  },
  cardContainerAvailable: { backgroundColor: 'transparent' },
  container: {
    aspectRatio: 0.58,
    backgroundColor: COLORS.thatch70,
    borderColor: COLORS.codeGrey50,
    borderRadius: 12,
    borderWidth: 5,
    elevation: 0,
    opacity: 0.7,
    position: 'relative',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    width: LEVEL_CARD_WIDTH,
  },
  containerSelected: { borderWidth: 8, elevation: 8, opacity: 1 },
  gradientContainer: { height: '100%', width: '100%' },
  greyShadow: { shadowColor: COLORS.swirl },
  image: { borderRadius: 5, height: '100%', width: '100%' },
  imageContainer: { height: '65%', paddingHorizontal: 15, paddingTop: 15 },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  levelLabel: { marginBottom: 5 },
  ratingContainer: { flexDirection: 'row', gap: 10 },
})
