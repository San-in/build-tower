import { LEVEL_CARD_WIDTH } from '@constants'
import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  bottomCard: {
    padding: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.thatch70,
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  cardContainerAvailable: { backgroundColor: 'transparent' },
  container: {
    aspectRatio: 0.58,
    backgroundColor: COLORS.thatch,
    borderColor: COLORS.thatch,
    borderRadius: 15,
    borderWidth: 5,
    elevation: 0,
    opacity: 0.7,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    width: LEVEL_CARD_WIDTH,
  },
  containerSelected: { borderWidth: 8, elevation: 8, opacity: 1 },
  gradientContainer: {
    borderRadius: 5,
    height: '100%',
    overflow: 'hidden',
    paddingHorizontal: 15,
    width: '100%',
  },
  greyShadow: { shadowColor: COLORS.swirl },
  imageContainer: {
    alignItems: 'stretch',
    borderRadius: 5,
    height: '65%',
    justifyContent: 'center',
    marginTop: 10,
    overflow: 'hidden',
    position: 'relative',
  },

  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  levelLabel: { marginBottom: 5 },
  ratingContainer: { flexDirection: 'row', gap: 10 },
})
