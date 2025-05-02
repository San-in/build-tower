import { StyleSheet } from 'react-native'

import { COLORS } from './Colors'

export const GlobalStyles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
})
