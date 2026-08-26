import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: formatTabletElementsSize(-24), // -24 for Tablet
    left: 0,
    position: 'absolute',
    right: 0,
  },
})
