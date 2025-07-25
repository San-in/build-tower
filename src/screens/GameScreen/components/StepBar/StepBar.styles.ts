import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 2,
  },
  contentContainer: {
    alignItems: 'center',
    elevation: 5,
    gap: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  stepBarContainer: {
    borderColor: COLORS.codeGrey40,
    flexDirection: 'row',
    gap: 1,
    height: 20,
    overflow: 'visible',
    position: 'relative',
    width: 150,
  },
  stepContainer: {
    height: '100%',
    width: '100%',
  },
  stepLabel: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: 26,
    width: '100%',
  },
})
