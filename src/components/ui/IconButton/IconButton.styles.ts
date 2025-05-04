import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: COLORS.codeGrey30,
    borderRadius: 16,
    padding: 5,
  },
  iconContainerPressed: {
    backgroundColor: COLORS.codeGrey10,
    transform: [{ scale: 0.85 }],
  },
})
