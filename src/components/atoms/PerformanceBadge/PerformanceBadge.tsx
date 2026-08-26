import { useIsDebugOverlayVisible } from '@hooks'
import { toggleDebugOverlay } from '@utils'
import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import {
  runOnJS,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { styles } from './PerformanceBadge.styles'

// Frame rate, live on screen, for both threads that can independently stall.
//
// UI is the one that matters for this app: Moti/reanimated and Lottie render
// there, so a shadow being re-rasterised every frame shows up as UI dropping
// while JS stays flat. JS dropping instead points at render churn or a busy
// bridge. Both sagging together is thermal throttling.
//
// Hidden by default; tap the Settings modal title 10 times to toggle. Reading
// it: a healthy screen sits at the display refresh rate and the ▼ worst value
// barely moves. Throttling shows as the worst value ratcheting down and never
// recovering — so play a few minutes, then look at ▼, not at the live number.
const SAMPLE_INTERVAL_MS = 1000
const WARNING_FPS = 50
const CRITICAL_FPS = 30
const UNKNOWN_FPS = -1

type ThreadSample = { fps: number; worstFps: number }

const INITIAL_SAMPLE: ThreadSample = {
  fps: UNKNOWN_FPS,
  worstFps: UNKNOWN_FPS,
}

const mergeSample = (previous: ThreadSample, fps: number): ThreadSample => ({
  fps,
  worstFps:
    previous.worstFps === UNKNOWN_FPS ? fps : Math.min(previous.worstFps, fps),
})

const PerformanceBadge = () => {
  const isVisible = useIsDebugOverlayVisible()
  const insets = useSafeAreaInsets()
  const [uiSample, setUiSample] = useState<ThreadSample>(INITIAL_SAMPLE)
  const [jsSample, setJsSample] = useState<ThreadSample>(INITIAL_SAMPLE)

  const frames = useSharedValue(0)
  const windowStartedAt = useSharedValue(0)

  const handleUiSample = useCallback((fps: number) => {
    setUiSample((previous) => mergeSample(previous, fps))
  }, [])

  // Counting happens on the UI thread; only one hop to JS per second, so the
  // badge does not distort what it is measuring.
  const frameCallback = useFrameCallback(
    ({ timestamp, timeSincePreviousFrame }) => {
      'worklet'
      if (timeSincePreviousFrame === null) {
        return
      }
      if (windowStartedAt.value === 0) {
        windowStartedAt.value = timestamp
        return
      }
      frames.value += 1
      const elapsed = timestamp - windowStartedAt.value
      if (elapsed >= SAMPLE_INTERVAL_MS) {
        runOnJS(handleUiSample)(Math.round((frames.value * 1000) / elapsed))
        frames.value = 0
        windowStartedAt.value = timestamp
      }
    },
    false
  )

  // useFrameCallback latches `autostart` on first render and never re-reads it,
  // so the visibility toggle has to go through setActive.
  useEffect(() => {
    frameCallback.setActive(isVisible)
  }, [frameCallback, isVisible])

  useEffect(() => {
    if (!isVisible) {
      return undefined
    }
    let isCancelled = false
    let frameCount = 0
    let startedAt = Date.now()
    let rafId = requestAnimationFrame(function tick() {
      if (isCancelled) {
        return
      }
      frameCount += 1
      const elapsed = Date.now() - startedAt
      if (elapsed >= SAMPLE_INTERVAL_MS) {
        const fps = Math.round((frameCount * 1000) / elapsed)
        setJsSample((previous) => mergeSample(previous, fps))
        frameCount = 0
        startedAt = Date.now()
      }
      rafId = requestAnimationFrame(tick)
    })
    return () => {
      isCancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  const handleReset = useCallback(() => {
    setUiSample(INITIAL_SAMPLE)
    setJsSample(INITIAL_SAMPLE)
  }, [])

  if (!isVisible) {
    return null
  }

  const renderRow = (label: string, { fps, worstFps }: ThreadSample) => (
    <Text
      allowFontScaling={false}
      style={[
        styles.value,
        worstFps !== UNKNOWN_FPS &&
          worstFps < CRITICAL_FPS &&
          styles.valueCritical,
        worstFps !== UNKNOWN_FPS &&
          worstFps >= CRITICAL_FPS &&
          worstFps < WARNING_FPS &&
          styles.valueWarning,
      ]}
    >
      {fps === UNKNOWN_FPS ? `${label} —` : `${label} ${fps} ▼${worstFps} fps`}
    </Text>
  )

  return (
    <View
      pointerEvents={'box-none'}
      style={[styles.container, { top: insets.top + 8 }]}
    >
      {renderRow('UI', uiSample)}
      {renderRow('JS', jsSample)}
      <Pressable
        hitSlop={8}
        onLongPress={toggleDebugOverlay}
        onPress={handleReset}
        style={({ pressed }) => [pressed && styles.hintPressed]}
      >
        <Text allowFontScaling={false} style={styles.hint}>
          {'tap: reset  ·  hold: hide'}
        </Text>
      </Pressable>
    </View>
  )
}

export default PerformanceBadge
