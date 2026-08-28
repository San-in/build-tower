import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
    marginHorizontal: formatTabletElementsSize(5),
  },
  blockCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: formatTabletElementsSize(5),
    marginHorizontal: formatTabletElementsSize(5),
  },
  buttonLabel: { flexWrap: 'wrap', maxWidth: formatTabletElementsSize(75) },

  buttonsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: formatTabletElementsSize(5),
    justifyContent: 'center',
    marginTop: formatTabletElementsSize(20),
    minWidth: '90%',
  },
  consolationPrizeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(2),
    justifyContent: 'center',
    marginTop: formatTabletElementsSize(10),
  },
  // Full width, not `flex: 1`: prizeContainer is a wrapping row whose long
  // "already claimed" message fills the line, and RN's default flexShrink of 0
  // means it never gives that width back. A zero-basis item would collapse to
  // 0 wide, hiding the text and leaving only the fixed-size BananasIcon
  // overflowing. A full-width basis puts this block on its own line instead.
  consolationPrizeHederContainer: {
    alignItems: 'center',
    width: '100%',
  },
  container: { alignItems: 'center', justifyContent: 'center' },
  iconContainer: {
    backgroundColor: COLORS.roseWhite20,
    borderColor: COLORS.roseWhite20,
    borderWidth: formatTabletElementsSize(1),
    padding: formatTabletElementsSize(10),
  },
  mainContent: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  priorityIcon: {
    borderColor: COLORS.gradientGold_1,
  },
  prizeBlock: {
    flexShrink: 1,
    marginLeft: formatTabletElementsSize(-2),
  },
  prizeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: formatTabletElementsSize(5),
  },
  prizeLabel: {
    marginLeft: formatTabletElementsSize(10),
    marginRight: formatTabletElementsSize(-5),
  },
  secondaryContent: {
    marginTop: formatTabletElementsSize(20),
  },
  subTitle: {
    marginBottom: formatTabletElementsSize(10),
  },
  textIcon: { fontSize: formatTabletElementsSize(40) },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
    justifyContent: 'center',
  },
})
