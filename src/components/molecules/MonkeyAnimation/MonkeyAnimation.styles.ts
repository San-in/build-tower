import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    shadowColor: COLORS.codeGrey,
    shadowOffset: { width: 10, height: 5 },
    transform: [{ scaleX: -1 }],
  },
})
