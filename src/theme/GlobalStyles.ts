import { StyleSheet } from 'react-native'

import { COLORS } from './Colors'

export const GlobalStyles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  invisible: {
    opacity: 0,
  },
  safeAreaContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  visible: {
    opacity: 1,
  },
})
