import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  imageContainer: {
    height: formatTabletElementsSize(200),
    marginBottom: formatTabletElementsSize(10),
    width: formatTabletElementsSize(200),
  },
})
