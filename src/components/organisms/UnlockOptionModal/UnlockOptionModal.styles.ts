import { IS_TABLET } from '@constants'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1 },
  buttonContent: { paddingHorizontal: formatTabletElementsSize(5) },
  buttonsContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(20),
    justifyContent: 'space-between',
    width: '100%',
  },
  container: { maxWidth: IS_TABLET ? '80%' : '95%' },
  emoji: { fontSize: formatTabletElementsSize(14) },
  infoMessage: { flexDirection: 'row', gap: formatTabletElementsSize(5) },
  infoMessageContainer: {
    alignSelf: 'flex-start',
    minHeight: formatTabletElementsSize(18),
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(30),
    padding: formatTabletElementsSize(5),
  },
})
