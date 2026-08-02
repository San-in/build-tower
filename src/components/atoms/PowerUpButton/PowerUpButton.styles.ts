import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  actionButtonsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
    marginLeft: 'auto',
  },
  addExtraStepPowerUp: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 0,
  },
  bananasContainer: {
    alignItems: 'center',
    borderColor: COLORS.yellow,
    borderRadius: formatTabletElementsSize(18),
    borderWidth: formatTabletElementsSize(4),
    flexDirection: 'row',
    gap: formatTabletElementsSize(1),
    justifyContent: 'center',
    paddingLeft: formatTabletElementsSize(10),
    paddingRight: formatTabletElementsSize(5),
    paddingVertical: formatTabletElementsSize(5),
  },
  bananasExternalContainer: {
    borderColor: COLORS.white60,
    borderRadius: formatTabletElementsSize(22),
    borderWidth: formatTabletElementsSize(4),
  },
  container: {
    alignItems: 'flex-end',
    elevation: 3,
    flexDirection: 'row',
    gap: formatTabletElementsSize(10),
    justifyContent: 'flex-start',
    marginTop: formatTabletElementsSize(-5),
    paddingHorizontal: formatTabletElementsSize(16),
    shadowColor: COLORS.codeGrey,
    shadowOffset: {
      width: formatTabletElementsSize(5),
      height: formatTabletElementsSize(3),
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'flex-start',
    flexGrow: 1,
    gap: formatTabletElementsSize(5),
  },
  gradientContainer: {
    alignItems: 'center',
    borderColor: COLORS.roseWhite,
    borderRadius: formatTabletElementsSize(15),
    borderWidth: formatTabletElementsSize(2),
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  powerUp: {
    borderColor: COLORS.codeGrey,
    borderRadius: formatTabletElementsSize(15),
    borderWidth: formatTabletElementsSize(1),
    height: formatTabletElementsSize(30),
    position: 'relative',
    width: formatTabletElementsSize(30),
  },
  powerUpContent: { bottom: formatTabletElementsSize(4) },
  powerUpCounter: {
    position: 'absolute',
    right: '-1%',
    top: '-15%',
  },
  powerUpPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.9 }],
  },
  powerUpsContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
  },
})
