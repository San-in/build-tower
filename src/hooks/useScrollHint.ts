import { useCallback, useRef, useState } from 'react'
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'

// Ignore sub-pixel overflow, and treat "almost at the bottom" as arrived so the
// hint doesn't linger over the last row.
const OVERFLOW_THRESHOLD = 8
const BOTTOM_THRESHOLD = 24

/**
 * Tells whether a ScrollView still has content below the fold. Spread
 * `scrollHintProps` onto the ScrollView and drive a hint off `isHintVisible`.
 * State only flips when the answer changes, so scrolling doesn't re-render.
 */
export const useScrollHint = () => {
  const [isHintVisible, setIsHintVisible] = useState(false)
  const metricsRef = useRef({ viewport: 0, content: 0, offset: 0 })

  const sync = useCallback(() => {
    const { viewport, content, offset } = metricsRef.current
    const overflow = content - viewport
    setIsHintVisible(
      overflow > OVERFLOW_THRESHOLD && overflow - offset > BOTTOM_THRESHOLD
    )
  }, [])

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      metricsRef.current.viewport = event.nativeEvent.layout.height
      sync()
    },
    [sync]
  )

  const onContentSizeChange = useCallback(
    (_: number, contentHeight: number) => {
      metricsRef.current.content = contentHeight
      sync()
    },
    [sync]
  )

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent
      metricsRef.current = {
        viewport: layoutMeasurement.height,
        content: contentSize.height,
        offset: contentOffset.y,
      }
      sync()
    },
    [sync]
  )

  return {
    isHintVisible,
    scrollHintProps: {
      onContentSizeChange,
      onLayout,
      onScroll,
      scrollEventThrottle: 16,
    },
  }
}
