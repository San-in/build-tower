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
  // Cancels BlockIcon's own shadow inside the tower; blockRow casts one for the
  // whole column instead. Standalone blocks elsewhere keep theirs.
  blockIcon: {
    elevation: 0,
    shadowOpacity: 0,
  },
  // Blocks are equal width and centre-aligned, so their individual right-hand
  // shadows used to line up into exactly this one strip — same silhouette, one
  // offscreen pass instead of up to 30 per tower on every rebuild.
  blockRow: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 5,
    flexDirection: 'column-reverse',
    shadowColor: COLORS.codeGrey,
    shadowOffset: {
      width: formatTabletElementsSize(10),
      height: formatTabletElementsSize(5),
    },
    shadowOpacity: 0.55,
    shadowRadius: formatTabletElementsSize(3.84),
  },
  container: { alignItems: 'center', justifyContent: 'flex-end' },
})
