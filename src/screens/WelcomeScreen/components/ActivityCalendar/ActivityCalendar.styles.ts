import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderColor: COLORS.codeGrey70,
    borderRadius: formatTabletElementsSize(45, 2.5),
    borderWidth: formatTabletElementsSize(3),
    flex: 1,
    height: '100%',
    paddingBottom: formatTabletElementsSize(12),
    paddingHorizontal: formatTabletElementsSize(12),
    position: 'relative',
  },
  bottomSheetImage: {
    backgroundColor: COLORS.backgroundBlue,
    borderRadius: '10%',
  },
  calendarList: {
    flex: 1,
  },
  calendarListContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.backgroundBlue,
    borderColor: COLORS.white90,
    borderRadius: formatTabletElementsSize(40),
    borderWidth: 3,
    flex: 1,
    justifyContent: 'center',
  },
  calendarListContentContainer: {
    paddingLeft: formatTabletElementsSize(20),
    paddingRight: formatTabletElementsSize(120),
  },
  successModalContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    marginVertical: formatTabletElementsSize(10),
  },
  successModalIconContainer: { marginVertical: 50 },
  title: { marginVertical: 10 },
})
