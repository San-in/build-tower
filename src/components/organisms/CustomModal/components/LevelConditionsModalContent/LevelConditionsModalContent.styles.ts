import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 0.5 },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContent: { paddingHorizontal: formatTabletElementsSize(5) },
  completedLevelText: {
    gap: formatTabletElementsSize(5),
    marginTop: formatTabletElementsSize(20),
  },
  consolationPrizeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(2),
    justifyContent: 'center',
  },
  container: { alignItems: 'center', gap: formatTabletElementsSize(15) },
  contentContainer: { alignItems: 'center' },
  failureCaseDescription: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: formatTabletElementsSize(5),
    justifyContent: 'center',
    marginTop: formatTabletElementsSize(20),
  },
  failureCaseQuestionSign: { marginLeft: -2 },
  rewardsBlocksQuantity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
    justifyContent: 'flex-end',
    minWidth: formatTabletElementsSize(55),
  },
  rewardsLine: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
    justifyContent: 'center',
    minWidth: formatTabletElementsSize(200),
    paddingLeft: formatTabletElementsSize(5),
  },
  rewardsPrize: { marginRight: formatTabletElementsSize(-5) },
  rewardsPrizeContainer: { marginHorizontal: formatTabletElementsSize(3) },
  rewardsTitle: { marginVertical: formatTabletElementsSize(15) },
  starsContainer: { flexDirection: 'row', gap: formatTabletElementsSize(5) },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
  },
})
