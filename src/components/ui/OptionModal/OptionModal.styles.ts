import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.codeGrey50,
  },
  button: { paddingHorizontal: 10 },
  buttonContainer: { flexDirection: 'row', gap: 8 },
  closeIcon: {
    opacity: 1,
    position: 'absolute',
    right: 15,
    top: 15,
  },
  closeIconPressed: {
    opacity: 0.7,
  },
  container: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.roseWhite,
    borderRadius: 28,
    gap: 24,
    maxWidth: 520,
    padding: 24,
    position: 'relative',
    width: '80%',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  text: { alignSelf: 'flex-start', color: COLORS.codeGrey },
  title: { color: COLORS.vanCleef, textAlign: 'center' },
})
