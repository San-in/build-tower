import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderColor: COLORS.codeGrey70,
    borderRadius: 45,
    borderWidth: 3,
    flex: 1,
    height: '100%',
    paddingBottom: 12,
    paddingHorizontal: 12,
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
    borderRadius: 40,
    borderWidth: 3,
    flex: 1,
    justifyContent: 'center',
  },
  calendarListContentContainer: { paddingLeft: 20, paddingRight: 120 },
  successModalContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    marginVertical: 10,
  },
  successModalIconContainer: { marginVertical: 50 },
  title: { marginVertical: 10 },
})
