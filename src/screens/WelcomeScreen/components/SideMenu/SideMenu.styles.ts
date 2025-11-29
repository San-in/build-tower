import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 5,
    position: 'absolute',
    right: 20,
    top: 0,
    zIndex: Z_INDEX_TYPE.high,
  },
  menuListContainer: { borderRadius: 12, marginLeft: 8, overflow: 'visible' },
  menuListContent: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 6,
  },
  menuListItemContainer: { position: 'relative' },
  menuListItemIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    zIndex: Z_INDEX_TYPE.medium,
  },
  menuListItemWithNotify: {
    borderColor: COLORS.roofTerracotta,
    borderWidth: 2,
  },
})
