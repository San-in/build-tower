import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.codeGrey70,
    borderRadius: 6,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  hint: {
    color: COLORS.white50,
    fontSize: 9,
    marginTop: 2,
  },
  hintPressed: { opacity: 0.5 },
  value: {
    color: COLORS.lightGreen,
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
  valueCritical: { color: COLORS.roofTerracotta },
  valueWarning: { color: COLORS.yellow },
})
