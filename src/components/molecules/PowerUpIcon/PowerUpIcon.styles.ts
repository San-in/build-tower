import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.codeGrey,
    borderWidth: 1,
    position: 'relative',
  },
  contentContainer: {
    alignItems: 'center',
    borderWidth: 4,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  text: { bottom: 6 },
})
