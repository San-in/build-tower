import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white40,
    borderColor: COLORS.white,
    borderRadius: 50,
    borderWidth: 5,
    justifyContent: 'center',
    marginBottom: 50,
    maxWidth: '90%',
    padding: 40,
  },
  pressableContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
})
