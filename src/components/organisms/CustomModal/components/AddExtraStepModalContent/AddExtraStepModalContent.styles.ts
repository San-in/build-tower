import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1 },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContent: { paddingHorizontal: 5 },
  buttonRestricted: {
    flex: 0.5,
  },
  container: { alignItems: 'center', gap: 25 },
  icon: { fontSize: 40, marginTop: -10 },
})
