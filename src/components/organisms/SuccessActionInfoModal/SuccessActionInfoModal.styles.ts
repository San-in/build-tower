import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: COLORS.backgroundBlue,
  },
  container: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white40,
    borderColor: COLORS.white,
    borderRadius: 50,
    borderWidth: 5,
    justifyContent: 'center',
    marginBottom: 50,
    maxWidth: '90%',
    padding: 40,
    zIndex: 5,
  },
  gifAnimation: {
    height: '100%',
    width: '100%',
  },
  gifContainer: { zIndex: 2 },
  pressableContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  winBannerAnimation: {
    height: '100%',
    opacity: 0.6,
    transform: [{ scale: 1.5 }],
    width: '100%',
  },
  winBannerContainer: {
    zIndex: 1,
  },
})
