import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 0.5 },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContent: { paddingHorizontal: 5 },
  completedLevelText: { gap: 5, marginTop: 20 },
  consolationPrizeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
  },
  container: { alignItems: 'center', gap: 15 },
  contentContainer: { alignItems: 'center' },
  failureCaseDescription: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    marginTop: 20,
  },
  failureCaseQuestionSign: { marginLeft: -2 },
  rewardsBlocksQuantity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-end',
    minWidth: 55,
  },
  rewardsLine: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    minWidth: 200,
    paddingLeft: 5,
  },
  rewardsPrize: { marginRight: -5 },
  rewardsPrizeContainer: { marginHorizontal: 3 },
  rewardsTitle: { marginVertical: 15 },
  starsContainer: { flexDirection: 'row', gap: 5 },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
})
