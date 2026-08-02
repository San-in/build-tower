import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.gradientPurple_2,
    borderWidth: formatTabletElementsSize(1),
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
    gap: formatTabletElementsSize(5),
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: formatTabletElementsSize(20, 2),
    paddingHorizontal: formatTabletElementsSize(10, 2.5),
    paddingTop: formatTabletElementsSize(10, 2.5),
  },
  descriptionRow: {
    alignItems: 'center',
    alignSelf: 'flex-end',

    flexDirection: 'row',
    gap: formatTabletElementsSize(3, 2.5),
    marginTop: formatTabletElementsSize(5),
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  giftPressable: {
    backgroundColor: COLORS.yellow10,
    borderColor: COLORS.white50,
    borderRadius: formatTabletElementsSize(50),
    borderWidth: formatTabletElementsSize(1),
    left: '50%',
    padding: formatTabletElementsSize(2),
    position: 'absolute',
    top: formatTabletElementsSize(-35),
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
    marginTop: formatTabletElementsSize(5),
  },
  levelBar: {
    backgroundColor: COLORS.codeGrey20,
    borderRightWidth: formatTabletElementsSize(1),
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
  singleGiftContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: formatTabletElementsSize(20),
    width: '100%',
  },
  singleGiftPressable: {
    alignItems: 'center',
    backgroundColor: COLORS.yellow10,
    borderColor: COLORS.white50,
    borderRadius: formatTabletElementsSize(50),
    borderWidth: formatTabletElementsSize(1),
    justifyContent: 'center',
    padding: formatTabletElementsSize(12),
  },
  singleIconWrapper: {
    aspectRatio: 1,
    height: formatTabletElementsSize(70),
  },
})
