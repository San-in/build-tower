import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { maxWidth: formatTabletElementsSize(220) },
  contentContainer: { alignItems: 'center' },
  image: {
    height: formatTabletElementsSize(300, 1.5),
    width: formatTabletElementsSize(300, 1.5),
  },
})
