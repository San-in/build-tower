import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

// Width of the segmented bar itself. Exported so overlays anchored to it (the
// stars-gif backdrop in GameScreen) can size themselves against the same value
// instead of guessing a per-step width.
export const STEP_BAR_WIDTH = formatTabletElementsSize(150)

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: formatTabletElementsSize(2),
    marginHorizontal: formatTabletElementsSize(4),
  },
  // No shadow here on purpose: this container is transparent AND holds a
  // forever-looping child animation, which is the pathological RN case — the
  // whole subtree gets re-rasterised offscreen every frame to compute the
  // shadow shape. The scale pulse below carries the emphasis instead.
  contentContainer: {
    alignItems: 'center',
    gap: formatTabletElementsSize(5),
  },
  stepBarContainer: {
    borderColor: COLORS.codeGrey40,
    flexDirection: 'row',
    gap: formatTabletElementsSize(1),
    height: formatTabletElementsSize(20),
    overflow: 'visible',
    position: 'relative',
    width: STEP_BAR_WIDTH,
  },
  stepContainer: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  stepContainerFilled: { backgroundColor: COLORS.collar },
  stepLabel: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: formatTabletElementsSize(24),
    width: '100%',
  },
  stepPulseDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.collar20,
  },
  stepPulseGold: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.gradientGold_1,
  },
})
