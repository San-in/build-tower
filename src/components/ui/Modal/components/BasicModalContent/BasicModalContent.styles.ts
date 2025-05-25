import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1, paddingHorizontal: 5 },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonRestricted: {
    flex: 0.5,
  },
  container: { alignItems: 'center', gap: 25 },
})
