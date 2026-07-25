import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    position: 'relative',
  },
  bottomGround: {
    backgroundColor: COLORS.codeGrey,
    height: formatTabletElementsSize(100, 1.5),
    width: '100%',
  },
  image: {
    backgroundColor: COLORS.backgroundBlue,
  },
  initialBlockTowerContainer: {
    justifyContent: 'flex-end',
    marginBottom: -2,
    position: 'relative',
  },
  levelConditionModalContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    maxWidth: '76%',
    minWidth: formatTabletElementsSize(275),
    transform: [{ translateY: '15%' }],
  },
  monkeyStageGroundContainer: {
    bottom: formatTabletElementsSize(-30),
    position: 'absolute',
    right: formatTabletElementsSize(-180),
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  monkeyStageInitTower: {
    marginTop: 'auto',
    transform: [{ translateY: formatTabletElementsSize(-2) }],
  },
  monkeyStageInitTowerContainer: {
    left: formatTabletElementsSize(-10),
    position: 'absolute',
    transform: [{ scaleX: -1 }],
  },
  monkeyStageUserTowerContainer: {
    position: 'absolute',
    right: formatTabletElementsSize(-15),
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  progressBadgeContainer: {
    alignItems: 'flex-end',
    gap: formatTabletElementsSize(80, 1.5),
    position: 'absolute',
    right: formatTabletElementsSize(25),
    top: formatTabletElementsSize(120, 1.5),
  },
  starsGif: {
    height: formatTabletElementsSize(100),
    width: formatTabletElementsSize(100),
  },
  starsGifBackdrop: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.yellow20,
    borderColor: COLORS.yellow40,
    borderRadius: formatTabletElementsSize(20),
    borderWidth: formatTabletElementsSize(1),
    height: formatTabletElementsSize(80),
    marginBottom: formatTabletElementsSize(-5),
    marginLeft: formatTabletElementsSize(-60),
  },
  starsGifContainer: {
    flexDirection: 'row',
    left: formatTabletElementsSize(-50),
    position: 'absolute',
    top: formatTabletElementsSize(-30),
    zIndex: Z_INDEX_TYPE.high,
  },
  towersContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: formatTabletElementsSize(50),
    paddingHorizontal: formatTabletElementsSize(20),
    paddingTop: formatTabletElementsSize(150),
    position: 'relative',
    width: '100%',
  },
  towersScrollWrapperContainer: {
    alignItems: 'flex-end',
    flexGrow: 1,
    minHeight: '100%',
    position: 'relative',
  },
  userBlockTowerContainer: {
    justifyContent: 'flex-end',
    position: 'relative',
  },
})
