import { IS_TABLET } from '@constants'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1 },
  buttonContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(20, 3),
    justifyContent: 'space-between',
    width: IS_TABLET ? '70%' : '100%',
  },
  buttonContent: { paddingHorizontal: 5 },
  buttonRestricted: {
    flex: 0.5,
  },
  container: { alignItems: 'center', gap: formatTabletElementsSize(25) },
  icon: { fontSize: formatTabletElementsSize(40), marginTop: -10 },
})
