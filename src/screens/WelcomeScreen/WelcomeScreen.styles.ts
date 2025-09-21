import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: COLORS.backgroundBlue,
    flex: 1,
    position: 'relative',
  },
  birdsAnimation: {
    height: '100%',
    width: '100%',
  },
  birdsAnimationContainer: { zIndex: 1 },
  image: {
    backgroundColor: COLORS.backgroundBlue,
  },
  sideMenuContainer: { alignItems: 'center', height: '100%', width: '100%' },
  startButton: { marginTop: 100 },
  title: {
    marginTop: 450,
    transform: [{ rotate: '7deg' }],
  },
})
