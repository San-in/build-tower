import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardText: { marginVertical: 4 },
  cardTextContainer: { height: '30%', justifyContent: 'center', width: '100%' },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 0.9,
    borderColor: COLORS.white,
    borderWidth: formatTabletElementsSize(3),
    elevation: 5,
    flex: 1,
    justifyContent: 'center',
    padding: 4,
    position: 'relative',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  content: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentContainer: {
    height: '100%',
    width: '100%',
  },
  prizeIconContainer: {
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  statusIconContainer: {
    backgroundColor: COLORS.white90,
    borderColor: COLORS.green80,
    borderRadius: formatTabletElementsSize(50),
    borderWidth: 2,
    padding: 5,
    position: 'absolute',
    right: -20,
    top: -20,
    zIndex: Z_INDEX_TYPE.extra_high,
  },
})
