import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  actionTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
  },
  actionTextIcon: { fontSize: formatTabletElementsSize(30) },
  background: {
    backgroundColor: COLORS.codeGrey70,
  },
  container: {
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(40),
    justifyContent: 'space-between',
    maxWidth: formatTabletElementsSize(520),
    padding: formatTabletElementsSize(24),
    position: 'relative',
  },
  subTitle: { marginBottom: formatTabletElementsSize(30) },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(10),
  },
})
