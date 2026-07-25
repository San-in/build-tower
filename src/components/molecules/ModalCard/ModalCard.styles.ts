import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardContainer: {
    borderColor: COLORS.white,
    borderRadius: formatTabletElementsSize(10),
    borderWidth: formatTabletElementsSize(2),
    elevation: 4,
    padding: formatTabletElementsSize(3),
    shadowColor: COLORS.codeGrey,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardContent: {
    alignItems: 'center',
    borderRadius: formatTabletElementsSize(8),
    gap: formatTabletElementsSize(3),
    height: formatTabletElementsSize(100),
    padding: formatTabletElementsSize(10),
  },
  container: { position: 'relative', width: '35%' },
  overlay: {
    backgroundColor: COLORS.codeGrey70,
    borderRadius: formatTabletElementsSize(10),
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: Z_INDEX_TYPE.extra_high,
  },
})
