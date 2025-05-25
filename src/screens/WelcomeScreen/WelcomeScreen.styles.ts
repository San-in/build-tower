import { LEVEL_CARD_GAP } from '@constants'
import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backIconPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.9 }],
  },
  backgroundImage: {
    flex: 1,
    position: 'relative',
  },

  bananasCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  foregroundImage: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  iconsContainer: {
    position: 'absolute',
    right: 20,
    top: '7%',
    zIndex: 5,
  },
  letsGoButton: { alignSelf: 'center' },
  levelsList: {
    alignItems: 'stretch',
    gap: LEVEL_CARD_GAP,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: COLORS.codeGrey50,
    flex: 1,
    paddingVertical: 50,
  },
  modalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  modalContentContainer: {
    alignItems: 'center',
    borderRadius: 28,
    gap: 20,
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 24,
    position: 'relative',
    width: '100%',
  },
  startButton: { marginTop: 130 },
  title: {
    marginTop: 300,
    transform: [{ rotate: '7deg' }],
  },
})
