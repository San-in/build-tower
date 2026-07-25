import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderRadius: formatTabletElementsSize(15),
    overflow: 'hidden',
  },
  contentContainer: {
    alignItems: 'center',
    borderColor: COLORS.white,
    borderRadius: formatTabletElementsSize(12),
    borderWidth: formatTabletElementsSize(4),
    flex: 1,
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
    justifyContent: 'center',
  },
  imageBackground: {
    minHeight: formatTabletElementsSize(200),
    minWidth: formatTabletElementsSize(150),
    padding: formatTabletElementsSize(15),
  },
  shadowContainer: {
    elevation: 4,
    padding: formatTabletElementsSize(5),
    shadowColor: COLORS.roseWhite70,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
})
