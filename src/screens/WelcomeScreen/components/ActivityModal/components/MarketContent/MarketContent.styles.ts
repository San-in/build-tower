import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.yellow10,
    borderColor: COLORS.white,
    borderRadius: formatTabletElementsSize(10, 1.4),
    borderWidth: formatTabletElementsSize(1),
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    position: 'absolute',
    right: '8%',
    shadowColor: COLORS.yellow20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    top: 20,
  },
  contentContainer: {
    width: '100%',
  },
  productsListContainer: { gap: 10 },
})
