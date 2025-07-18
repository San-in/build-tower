import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    position: 'relative',
  },
  externalBorder: {
    borderColor: COLORS.codeGrey,
    borderRadius: 14,
    borderWidth: 6,
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  gradientBackground: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  gradientContainer: {
    borderRadius: 14,
    zIndex: 1,
  },
  pressedContainer: {
    transform: [{ scale: 0.95 }, { translateX: 3 }, { translateY: 2 }],
  },
  titleContainer: { zIndex: 2 },
})
