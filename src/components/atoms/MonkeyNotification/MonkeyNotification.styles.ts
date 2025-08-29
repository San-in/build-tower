import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.codeGrey40,
  },
  card: {
    aspectRatio: 1,
    gap: 12,
    position: 'absolute',
    right: 40,
    top: '5%',
    width: 250,
    zIndex: 15,
  },
  image: { height: '120%', width: '120%' },
  phraseContainer: {
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    left: 30,
    position: 'absolute',
    top: 30,
    width: 140,
  },
})
