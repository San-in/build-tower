import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

// TEMP: awards test panel — remove after testing
export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.gradientBlue_4,
    borderRadius: 8,
    marginRight: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonLabel: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  container: {
    bottom: 40,
    left: 0,
    paddingHorizontal: 8,
    position: 'absolute',
    right: 0,
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  resetButton: {
    backgroundColor: COLORS.gradientRed_1,
    borderRadius: 8,
    marginRight: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
