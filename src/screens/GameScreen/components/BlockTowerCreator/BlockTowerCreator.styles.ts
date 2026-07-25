import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  block: {
    backgroundColor: COLORS.roseWhite10,
    borderColor: COLORS.serenade10,
    borderLeftWidth: formatTabletElementsSize(0.5),
    borderRightWidth: formatTabletElementsSize(0.5),
  },
  blockRow: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  container: { alignItems: 'center', justifyContent: 'flex-end' },
})
