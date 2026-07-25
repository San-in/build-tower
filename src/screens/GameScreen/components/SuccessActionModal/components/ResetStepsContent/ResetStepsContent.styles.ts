import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
  },
})
