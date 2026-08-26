/**
 * Hidden performance overlay, opened by tapping a modal title 10 times.
 *
 * Deliberately NOT gated on __DEV__: the whole point is to read a release
 * (preview / TestFlight) build, where thermal throttling actually shows up.
 * It stays invisible until the gesture is performed, and costs nothing while
 * hidden — the badge subscribes to no timers until it is on screen.
 */
const TAPS_TO_TOGGLE = 10
// Taps further apart than this are treated as a new attempt, so ordinary
// title taps spread over a session never add up to the gesture.
const TAP_RESET_MS = 3000

let isVisible = false
let tapCount = 0
let lastTapAt = 0

const listeners = new Set<() => void>()

const emit = (): void => {
  listeners.forEach((listener) => listener())
}

export const subscribeToDebugOverlay = (listener: () => void): (() => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const getIsDebugOverlayVisible = (): boolean => isVisible

export const toggleDebugOverlay = (): void => {
  isVisible = !isVisible
  tapCount = 0
  emit()
}

export const registerDebugOverlayTap = (): void => {
  const now = Date.now()
  tapCount = now - lastTapAt > TAP_RESET_MS ? 1 : tapCount + 1
  lastTapAt = now
  if (tapCount >= TAPS_TO_TOGGLE) {
    toggleDebugOverlay()
  }
}
