import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    position: 'relative',
  },
  bottomGround: {
    backgroundColor: COLORS.codeGrey,
    height: 100,
    width: '100%',
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
    minWidth: 275,
    transform: [{ translateY: '15%' }],
  },
  monkeyStageGroundContainer: {
    bottom: -30,
    position: 'absolute',
    right: -180,
    zIndex: 10,
  },
  monkeyStageInitTower: { marginTop: 'auto' },
  monkeyStageInitTowerContainer: {
    left: -10,
    position: 'absolute',
    top: -35,
    transform: [{ scaleX: -1 }],
  },
  monkeyStageUserTowerContainer: {
    position: 'absolute',
    right: -15,
    zIndex: 10,
  },
  progressBadgeContainer: {
    alignItems: 'flex-end',
    gap: 80,
    position: 'absolute',
    right: 25,
    top: 120,
  },
  towersContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 50,
    paddingHorizontal: 20,
    paddingTop: 150,
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
