import { StyleSheet, useWindowDimensions } from 'react-native'
import { COLORS } from '@theme'
import { LEVEL_CARD_GAP, LEVEL_CARD_WIDTH } from '@constants'

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: 'relative',
  },
  foregroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  iconsContainer: {
    position: 'absolute',
    top: '7%',
    right: 20,
    zIndex: 5,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 16,
    backgroundColor: COLORS.codeGrey30,
  },
  iconContainerPressed: {
    backgroundColor: COLORS.codeGrey10,
  },
  modalBackground: {
    backgroundColor: COLORS.codeGrey50,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  modalContainer: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  backIcon: {
    padding: 5,
    borderRadius: 16,
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  backIconPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.9 }],
  },
  bananasCounter: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  modalContentContainer: {
    alignItems: 'center',
    borderRadius: 28,
    gap: 20,
    paddingVertical: 24,
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
  },
  levelsList: {
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: LEVEL_CARD_GAP,
    paddingVertical: 40,
  },
  letsGoButton: { alignSelf: 'center' },
  title: {
    marginTop: 300,
    transform: [{ rotate: '7deg' }],
  },
  startButton: { marginTop: 100 },
})
