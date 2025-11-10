import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.yellow10,
    borderColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    position: 'absolute',
    right: 10,
    shadowColor: COLORS.yellow20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    top: 25,
  },
  contentContainer: {
    width: '100%',
  },
  productsListContainer: { gap: 10 },
})
