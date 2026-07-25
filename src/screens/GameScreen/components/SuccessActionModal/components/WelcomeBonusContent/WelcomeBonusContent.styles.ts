import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  highLighterTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(5),
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(20),
    marginVertical: formatTabletElementsSize(30),
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: formatTabletElementsSize(5),
  },
})
