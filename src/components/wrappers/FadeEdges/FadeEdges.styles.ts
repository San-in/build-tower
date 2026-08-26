import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const useStyles = (fadeSize: number) =>
  StyleSheet.create({
    container: { width: '100%' },
    mask: { flex: 1 },
    maskFade: {
      height: fadeSize,
      width: '100%',
    },
    maskSolid: {
      backgroundColor: COLORS.codeGrey,
      flex: 1,
    },
  })
