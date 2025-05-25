import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerCircleContainer: {
    flexDirection: 'row',
    gap: 5,
    position: 'absolute',
    transform: [{ translateY: '-50%' }],
  },
  knobIconContainer: {
    position: 'absolute',
    top: -35,
    zIndex: 1,
  },
})
