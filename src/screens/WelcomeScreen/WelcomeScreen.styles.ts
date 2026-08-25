import { IS_TABLET, Z_INDEX_TYPE } from '@constants'
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
  birdsAnimationContainer: { zIndex: Z_INDEX_TYPE.minimal },
  image: {
    backgroundColor: COLORS.backgroundBlue,
  },
  sideMenuContainer: {
    alignItems: 'center',
    height: '100%',
    marginTop: 20,
    width: '100%',
  },
  startButton: { marginTop: 100, zIndex: Z_INDEX_TYPE.high },
  titleWrapper: {
    marginTop: IS_TABLET ? 750 : 450,
    transform: [{ rotate: '7deg' }],
  },
})
