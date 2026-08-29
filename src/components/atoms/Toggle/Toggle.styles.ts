import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const TRACK_WIDTH = formatTabletElementsSize(55, 1.5)
export const TRACK_HEIGHT = formatTabletElementsSize(31, 1.5)
export const THUMB_SIZE = formatTabletElementsSize(27, 1.5)
export const THUMB_INSET = formatTabletElementsSize(2, 1.5)
export const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_INSET * 2

export const styles = StyleSheet.create({
  thumb: {
    borderRadius: THUMB_SIZE / 2,
    elevation: 3,
    height: THUMB_SIZE,
    shadowColor: COLORS.codeGrey,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    width: THUMB_SIZE,
  },
  track: {
    borderRadius: TRACK_HEIGHT / 2,
    height: TRACK_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: THUMB_INSET,
    width: TRACK_WIDTH,
  },
})
