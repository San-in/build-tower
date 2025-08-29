import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: COLORS.backgroundBlue,
    flex: 1,
    position: 'relative',
  },
  startButton: { marginTop: 100 },
  title: {
    marginTop: 450,
    transform: [{ rotate: '7deg' }],
  },
})
