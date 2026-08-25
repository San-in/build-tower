import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'relative',
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: formatTabletElementsSize(20),
  },
  button: { flex: 1 },
  buttonContent: { paddingHorizontal: formatTabletElementsSize(5) },
  buttonsContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(30),
    paddingHorizontal: formatTabletElementsSize(10),
  },
  gestureHandlerRoot: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: formatTabletElementsSize(16),
    width: '100%',
  },
  headerContent: { alignItems: 'center', flexDirection: 'row' },
  headerContentContainer: {
    alignItems: 'center',
    gap: formatTabletElementsSize(10, 1.5),
    marginBottom: formatTabletElementsSize(30, 1.5),
  },
  headerPowerUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(10),
  },
  imageContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  increasedSectorValues: {
    fontSize: formatTabletElementsSize(32),
  },
  initialResultContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(10),
    marginRight: formatTabletElementsSize(10),
  },
  spinCounterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: formatTabletElementsSize(10),
  },
  wheelResultText: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(20),
    marginTop: formatTabletElementsSize(20),
  },
})
