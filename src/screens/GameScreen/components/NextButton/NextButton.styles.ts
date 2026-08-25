import { IS_TABLET } from '@constants'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  buttonContainer: { paddingHorizontal: formatTabletElementsSize(14) },
  buttonWrapper: { marginTop: 'auto' },
  container: {
    bottom: formatTabletElementsSize(50),
    justifyContent: 'space-between',
    position: 'absolute',
    right: formatTabletElementsSize(20),
    top: IS_TABLET ? '50%' : '25%',
  },
})
