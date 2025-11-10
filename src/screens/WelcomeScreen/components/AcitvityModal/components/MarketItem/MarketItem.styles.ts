import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  activeContainer: {
    backgroundColor: COLORS.white10,
    borderWidth: 3,
    shadowColor: COLORS.yellow30,
    transform: [{ scale: 1 }],
  },
  buttonContainer: { paddingHorizontal: 5 },
  buttonIcon: { fontSize: 14 },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.codeGrey20,
    borderRadius: 20,
    borderWidth: 2,
    elevation: 5,
    flexDirection: 'row',
    flex: 1,
    gap: 5,
    paddingLeft: 5,
    paddingRight: 65,
    paddingVertical: 5,
    shadowColor: COLORS.yellow20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    transform: [{ scale: 0.98 }],
    width: '100%',
  },
  description: { textAlign: 'left' },
  descriptionContainer: { maxWidth: '44%' },
})
