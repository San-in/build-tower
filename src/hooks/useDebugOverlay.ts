import { getIsDebugOverlayVisible, subscribeToDebugOverlay } from '@utils'
import { useSyncExternalStore } from 'react'

export const useIsDebugOverlayVisible = (): boolean =>
  useSyncExternalStore(
    subscribeToDebugOverlay,
    getIsDebugOverlayVisible,
    getIsDebugOverlayVisible
  )
