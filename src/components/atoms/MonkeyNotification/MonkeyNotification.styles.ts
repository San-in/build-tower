import { IS_TABLET, Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.codeGrey40,
  },
  card: {
    aspectRatio: 1,
    gap: formatTabletElementsSize(12),
    position: 'absolute',
    right: 0,
    top: '5%',
    width: formatTabletElementsSize(250),
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  image: {
    height: IS_TABLET ? '240%' : '120%',
    width: IS_TABLET ? '240%' : '120%',
  },
  phraseContainer: {
    alignItems: 'center',
    height: formatTabletElementsSize(70),
    justifyContent: 'center',
    left: formatTabletElementsSize(35),
    position: 'absolute',
    top: formatTabletElementsSize(25),
    width: formatTabletElementsSize(100),
  },
})
