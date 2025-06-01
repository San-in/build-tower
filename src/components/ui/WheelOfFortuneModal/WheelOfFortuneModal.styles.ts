import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: COLORS.codeGrey90,
    position: 'relative',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: { flex: 1 },
  buttonContent: { paddingHorizontal: 5 },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  headerContent: { alignItems: 'center', flexDirection: 'row' },
  headerContentContainer: { alignItems: 'center', gap: 10, marginBottom: 30 },
  imageContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  initialResultContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginRight: 10,
  },
  spinCounterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  wheelResultContainer: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  wheelResultContent: {
    alignItems: 'center',
    backgroundColor: COLORS.white40,
    borderColor: COLORS.white,
    borderRadius: 50,
    borderWidth: 5,
    justifyContent: 'center',
    marginBottom: 50,
    padding: 40,
  },
  wheelResultPressableContainer: {
    height: '100%',
    width: '100%',
  },
  wheelResultText: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
})
