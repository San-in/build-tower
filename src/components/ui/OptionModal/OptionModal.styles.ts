import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.codeGrey70,
  },
  container: {
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'space-between',
    maxWidth: 520,
    padding: 24,
    position: 'relative',
  },
})
