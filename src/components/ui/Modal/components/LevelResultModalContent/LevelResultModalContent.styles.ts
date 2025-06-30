import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginHorizontal: 5,
  },
  blockCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginHorizontal: 5,
  },

  buttonLabel: { flexWrap: 'wrap', width: 50 },
  buttonsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  container: { alignItems: 'center', justifyContent: 'center' },
  iconContainer: {
    backgroundColor: COLORS.roseWhite20,
    borderColor: COLORS.roseWhite20,
    borderWidth: 1,
    padding: 10,
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
    flex: 1,
  },
  prizeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  prizeLabel: { marginLeft: 10, marginRight: -5 },
  secondaryContent: {
    marginTop: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  subTitle: {
    marginBottom: 30,
  },
  textIcon: { fontSize: 40 },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
})
