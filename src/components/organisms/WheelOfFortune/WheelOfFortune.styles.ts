import { Z_INDEX_TYPE } from '@constants'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerCircleContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
    position: 'absolute',
    transform: [{ translateY: '-50%' }],
  },
  knobIconContainer: {
    position: 'absolute',
    top: formatTabletElementsSize(-35),
    zIndex: Z_INDEX_TYPE.minimal,
  },
})
