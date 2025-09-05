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
  starsGif: { height: 100, width: 100 },
  starsGifBackdrop: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.yellow20,
    borderColor: COLORS.yellow40,
    borderRadius: 20,
    borderWidth: 1,
    height: 80,
    marginBottom: -5,
    marginLeft: -60,
  },
  starsGifContainer: {
    flexDirection: 'row',
    left: -50,
    position: 'absolute',
    top: -30,
    zIndex: 5,
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
