import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.codeGrey50,
    paddingHorizontal: 16,
  },
  buttonsContainer: { flexDirection: 'row', gap: 20, marginTop: 20 },
  closeIcon: {
    opacity: 1,
    position: 'absolute',
    right: 3,
    top: 2,
    zIndex: 5,
  },
  closeIconPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  },
  container: {
    maxWidth: '90%',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 16,
    overflow: 'hidden',
    padding: 15,
    width: '100%',
  },
  gradientContainer: {
    borderColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 4,
  },
  imageBackground: {
    borderColor: COLORS.codeGrey90,
    borderRadius: 20,
    borderWidth: 4,
    overflow: 'hidden',
    padding: 15,
    position: 'relative',
  },
  monkeyImage: {
    height: 150,
    left: '50%',
    position: 'absolute',
    top: -125,
    transform: [{ translateX: '-50%' }],
    width: 150,
    zIndex: 9,
  },
  text: { alignSelf: 'flex-start', color: COLORS.codeGrey },
  title: { color: COLORS.vanCleef, textAlign: 'center' },
})
