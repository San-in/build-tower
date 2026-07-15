import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.gradientPurple_2,
    borderWidth: 1,
  },
  backgroundGradient: {
    zIndex: Z_INDEX_TYPE.hidden,
  },
  checkOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
  },
  content: {
    alignItems: 'center',
    gap: 5,
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: formatTabletElementsSize(30, 2.5),
    paddingHorizontal: formatTabletElementsSize(10, 2.5),
    paddingTop: formatTabletElementsSize(10, 2.5),
  },
  descriptionRow: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: formatTabletElementsSize(3, 2.5),
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  giftPressable: {
    backgroundColor: COLORS.yellow10,
    borderColor: COLORS.white50,
    borderRadius: 50,
    borderWidth: 1,
    left: '50%',
    padding: 2,
    position: 'absolute',
    top: -35,
  },
  gradientBar: {
    height: '100%',
    position: 'absolute',
  },
  handleIndicator: {
    backgroundColor: COLORS.white,
  },
  iconWrapper: {
    aspectRatio: 1,
    flex: 1,
    marginTop: 30,
  },
  levelBar: {
    backgroundColor: COLORS.codeGrey20,
    borderRightWidth: 1,
    elevation: 4,
    height: formatTabletElementsSize(20),
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    width: formatTabletElementsSize(50),
  },
  romanContainer: {
    position: 'absolute',
    right: 0,
    top: formatTabletElementsSize(25, 1.5),
  },
  scrollContent: {
    alignItems: 'center',
    zIndex: Z_INDEX_TYPE.high,
  },
  scrollView: {
    flexDirection: 'row',
  },
})
