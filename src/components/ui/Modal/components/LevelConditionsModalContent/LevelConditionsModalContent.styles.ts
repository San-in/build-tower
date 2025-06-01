import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 0.5 },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContent: { paddingHorizontal: 5 },
  container: { alignItems: 'center', gap: 15 },
  contentContainer: { alignItems: 'center' },
  failureCaseDescription: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
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
    minWidth: 200,
    paddingLeft: 5,
  },
  rewardsPrize: { marginRight: -5 },
  rewardsPrizeContainer: { marginHorizontal: 3 },
  rewardsTitle: { marginVertical: 15 },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
})
