import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: formatTabletElementsSize(4),
  },
  containerWithNotify: {
    borderColor: COLORS.roofTerracotta,
    borderWidth: formatTabletElementsSize(2),
  },
  disableShadow: {
    backgroundColor: COLORS.codeGrey70,
    borderRadius: formatTabletElementsSize(16),
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: Z_INDEX_TYPE.high,
  },
  exclamationIconContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
    zIndex: Z_INDEX_TYPE.medium,
  },
  iconContainer: {
    backgroundColor: COLORS.codeGrey30,
    borderRadius: formatTabletElementsSize(16),
    padding: formatTabletElementsSize(5),
    position: 'relative',
  },
  iconContainerPressed: {
    backgroundColor: COLORS.codeGrey10,
    transform: [{ scale: 0.85 }],
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(2),
    maxWidth: formatTabletElementsSize(60),
  },
  lock: { fontSize: formatTabletElementsSize(14) },
})
