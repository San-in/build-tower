import { IS_TABLET, Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.codeGrey50,
    paddingHorizontal: formatTabletElementsSize(16),
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(20),
    marginTop: formatTabletElementsSize(20),
  },
  closeIcon: {
    opacity: 1,
    position: 'absolute',
    right: 3,
    top: 2,
    zIndex: Z_INDEX_TYPE.high,
  },
  closeIconPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  },
  container: {
    marginTop: IS_TABLET ? 100 : 0,
    maxWidth: '90%',
  },
  contentContainer: {
    alignItems: 'center',
    gap: formatTabletElementsSize(16),
    overflow: 'hidden',
    padding: IS_TABLET ? 20 : 15,
    width: '100%',
  },
  gestureHandlerRoot: {
    flex: 1,
  },
  gradientContainer: {
    borderColor: COLORS.white,
    borderRadius: formatTabletElementsSize(18),
    borderWidth: formatTabletElementsSize(4),
  },
  imageBackground: {
    borderColor: COLORS.codeGrey90,
    borderRadius: formatTabletElementsSize(20),
    borderWidth: formatTabletElementsSize(4),
    overflow: 'hidden',
    padding: formatTabletElementsSize(15),
    position: 'relative',
  },
  monkeyImage: {
    height: formatTabletElementsSize(150, 1.7),
    left: '50%',
    position: 'absolute',
    top: formatTabletElementsSize(-125, 1.7),
    transform: [{ translateX: '-50%' }],
    width: formatTabletElementsSize(150, 1.7),
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  text: { alignSelf: 'flex-start', color: COLORS.codeGrey },
  title: { color: COLORS.vanCleef, textAlign: 'center' },
})
