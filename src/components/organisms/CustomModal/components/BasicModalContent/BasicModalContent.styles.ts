import { IS_TABLET } from '@constants'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1 },
  buttonContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(20, 4),
    justifyContent: 'space-between',
    width: IS_TABLET ? '70%' : '100%',
  },
  buttonContent: { paddingHorizontal: formatTabletElementsSize(5) },
  buttonRestricted: {
    flex: 0.5,
  },
  container: { alignItems: 'center', gap: formatTabletElementsSize(25) },
})
