import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  contentContainer: {
    alignItems: 'center',
    borderColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 4,
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  imageBackground: { minHeight: 200, minWidth: 150, padding: 15 },
  shadowContainer: {
    elevation: 4,
    padding: 5,
    shadowColor: COLORS.roseWhite70,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
})
