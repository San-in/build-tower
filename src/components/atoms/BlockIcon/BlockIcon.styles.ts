import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.white10,
    borderColor: COLORS.codeGrey,
    borderWidth: 1,
    elevation: 5,
    shadowColor: COLORS.codeGrey,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  },
  image: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
})
