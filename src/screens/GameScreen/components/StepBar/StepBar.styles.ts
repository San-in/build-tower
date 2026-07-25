import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: formatTabletElementsSize(2),
    marginHorizontal: formatTabletElementsSize(4),
  },
  contentContainer: {
    alignItems: 'center',
    elevation: 5,
    gap: formatTabletElementsSize(5),
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  stepBarContainer: {
    borderColor: COLORS.codeGrey40,
    flexDirection: 'row',
    gap: formatTabletElementsSize(1),
    height: formatTabletElementsSize(20),
    overflow: 'visible',
    position: 'relative',
    width: formatTabletElementsSize(150),
  },
  stepContainer: {
    height: '100%',
    width: '100%',
  },
  stepLabel: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: formatTabletElementsSize(24),
    width: '100%',
  },
})
