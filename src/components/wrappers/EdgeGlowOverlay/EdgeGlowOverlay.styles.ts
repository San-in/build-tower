import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')
export const styles = StyleSheet.create({
  bottom: {
    bottom: 0,
    height: 50,
    width,
  },
  container: { zIndex: 10 },
  edge: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 10,
  },
  left: {
    height,
    left: 0,
    width: 50,
  },
  right: {
    height,
    right: 0,
    width: 50,
  },
  top: {
    height: 50,
    top: 0,
    width,
  },
})
