import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  block: {
    backgroundColor: COLORS.roseWhite10,
    borderColor: COLORS.serenade10,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  blockRow: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  container: { alignItems: 'center', justifyContent: 'flex-end' },
})
