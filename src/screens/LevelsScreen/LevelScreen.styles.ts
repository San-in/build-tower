import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backIconPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.9 }],
  },
  backgroundImage: {
    backgroundColor: COLORS.backgroundBlue,
    flex: 1,
    position: 'relative',
  },
  bananasCounter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    left: 16,
    position: 'absolute',
    right: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 0,
    position: 'relative',
  },
  image: {
    backgroundColor: COLORS.backgroundBlue,
  },
  letsGoButton: { alignItems: 'center' },
  levelsList: {
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  modalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 20,
    width: '100%',
  },
  modalContentContainer: {
    alignItems: 'center',
    borderRadius: 28,
    gap: 20,
    justifyContent: 'flex-start',
    paddingVertical: 24,
    position: 'relative',
    width: '100%',
  },
  title: { marginBottom: 12 },
})
