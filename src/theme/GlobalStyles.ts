import { StyleSheet } from 'react-native'

export const GlobalStyles = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  invisible: {
    opacity: 0,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  visible: {
    opacity: 1,
  },
})
