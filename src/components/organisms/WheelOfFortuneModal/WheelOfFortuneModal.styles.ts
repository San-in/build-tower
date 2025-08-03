import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundContainer: {
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
  headerPowerUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  imageContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  increasedSectorValues: {
    fontSize: 32,
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
  wheelResultText: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
})
