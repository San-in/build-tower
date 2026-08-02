import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderColor: COLORS.white00,
    borderRadius: formatTabletElementsSize(20),
    borderWidth: formatTabletElementsSize(2),
    elevation: 4,
    justifyContent: 'center',
    padding: formatTabletElementsSize(10),
    position: 'relative',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.yellow10,
    borderColor: COLORS.white,
    borderRadius: formatTabletElementsSize(10),
    borderWidth: formatTabletElementsSize(1),
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: formatTabletElementsSize(5),
    position: 'absolute',
    right: formatTabletElementsSize(10),
    shadowColor: COLORS.yellow20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    top: formatTabletElementsSize(25),
  },
  contentContainer: {
    width: '100%',
  },
  grid: {
    columnGap: formatTabletElementsSize(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: formatTabletElementsSize(5),
    paddingVertical: formatTabletElementsSize(20),
    rowGap: formatTabletElementsSize(20),
  },
  iconWrapper: {
    aspectRatio: 1,
    width: formatTabletElementsSize(50),
  },
  maxedBorder: {
    borderColor: COLORS.gradientGold_1,
  },
  romanBadge: {
    position: 'absolute',
    right: formatTabletElementsSize(5, 3),
    top: formatTabletElementsSize(-5, -1),
  },
  unclaimedBorder: {
    borderColor: COLORS.roseWhite,
  },
})
