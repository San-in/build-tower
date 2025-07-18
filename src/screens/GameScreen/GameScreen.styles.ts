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
  towersContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 50,
    paddingHorizontal: 20,
    paddingTop: 100,
    position: 'relative',
    width: '100%',
  },
  towersScrollWrapperContainer: {
    alignItems: 'flex-end',
    flexGrow: 1,
    position: 'relative',
  },
  userBlockTowerContainer: {
    justifyContent: 'flex-end',
    marginBottom: 2,
    position: 'relative',
  },
})
