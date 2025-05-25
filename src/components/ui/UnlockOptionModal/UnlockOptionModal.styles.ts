import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1, paddingHorizontal: 5 },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  infoMessage: { flexDirection: 'row', gap: 5 },
  infoMessageContainer: {
    alignSelf: 'flex-start',
    minHeight: 18,
  },
  optionsContainer: { flexDirection: 'row', gap: 30, padding: 5 },
})
