import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.codeGrey50,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  contentContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    padding: 20,
    transform: [{ translateY: '-30%' }],
    width: '100%',
  },
})
