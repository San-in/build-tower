import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 20,
    elevation: 4,
    justifyContent: 'center',
    padding: 10,
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
    borderRadius: 10,
    borderWidth: 1,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    position: 'absolute',
    right: 10,
    shadowColor: COLORS.yellow20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    top: 25,
  },
  contentContainer: {
    width: '100%',
  },
  grid: {
    columnGap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 20,
    rowGap: 20,
  },
  iconWrapper: {
    aspectRatio: 1,
    width: formatTabletElementsSize(50),
  },
  productsListContainer: {},
  romanBadge: {
    position: 'absolute',
    right: 5,
    top: -5,
  },
})
