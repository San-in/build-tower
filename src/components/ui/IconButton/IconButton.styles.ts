import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'column', gap: 4 },
  disableShadow: {
    backgroundColor: COLORS.codeGrey70,
    borderRadius: 16,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 5,
  },
  iconContainer: {
    backgroundColor: COLORS.codeGrey30,
    borderRadius: 16,
    padding: 5,
    position: 'relative',
  },
  iconContainerPressed: {
    backgroundColor: COLORS.codeGrey10,
    transform: [{ scale: 0.85 }],
  },
  labelContainer: { alignItems: 'center', flexDirection: 'row', gap: 2 },
})
