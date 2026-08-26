import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

// Safety valve: a stuck download must never strand the app on the native splash.
const MAX_SPLASH_MS = 6000

let alreadyHidden = false

const hideSplash = () => {
  if (alreadyHidden) {
    return
  }
  alreadyHidden = true
  void SplashScreen.hideAsync().catch(() => {})
}

/**
 * Holds the native splash until the first screen has actually painted.
 *
 * Without it the splash auto-hides the moment the JS bundle is up, which exposes
 * the hydration spinner and then the WelcomeScreen's bare background colour while
 * its artwork is still decoding — the blue gap before the real screen appears.
 */
export const useHideSplashWhenReady = (isReady: boolean): void => {
  useEffect(() => {
    if (isReady) {
      hideSplash()
    }
    const timerId = setTimeout(hideSplash, MAX_SPLASH_MS)
    return () => clearTimeout(timerId)
  }, [isReady])
}
