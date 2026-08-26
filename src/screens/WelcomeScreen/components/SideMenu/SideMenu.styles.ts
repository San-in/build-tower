import { IS_TABLET, Z_INDEX_TYPE } from '@constants'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: Z_INDEX_TYPE.medium,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: formatTabletElementsSize(5),
    position: 'absolute',
    right: formatTabletElementsSize(20),
    top: IS_TABLET ? 40 : 0,
    zIndex: Z_INDEX_TYPE.high,
  },
  menuListContainer: {
    borderRadius: formatTabletElementsSize(12),
    marginLeft: 8,
    overflow: 'visible',
  },
  menuListContent: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: formatTabletElementsSize(6),
  },
})
