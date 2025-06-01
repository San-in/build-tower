import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardContainer: {
    borderColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    elevation: 4,
    padding: 3,
    shadowColor: COLORS.codeGrey,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardContent: {
    alignItems: 'center',
    borderRadius: 8,
    gap: 3,
    height: 100,
    padding: 10,
  },
  container: { minWidth: '35%', position: 'relative' },
  overlay: {
    backgroundColor: COLORS.codeGrey70,
    borderRadius: 10,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9,
  },
})
