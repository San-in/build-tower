import { IS_TABLET } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
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
    left: formatTabletElementsSize(16),
    position: 'absolute',
    right: formatTabletElementsSize(16),
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
    paddingVertical: formatTabletElementsSize(40),
  },
  modalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: formatTabletElementsSize(24),
    marginTop: IS_TABLET ? 40 : 0,
    paddingHorizontal: formatTabletElementsSize(20),
    width: '100%',
  },
  modalContentContainer: {
    alignItems: 'center',
    borderRadius: formatTabletElementsSize(28),
    gap: formatTabletElementsSize(20, 1),
    justifyContent: 'flex-start',
    paddingVertical: formatTabletElementsSize(24, 1),
    position: 'relative',
    width: '100%',
  },
  title: { marginBottom: formatTabletElementsSize(12, 1) },
  titleContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: formatTabletElementsSize(16),
  },
})
