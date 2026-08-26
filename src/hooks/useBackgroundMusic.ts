import { useFocusEffect } from '@react-navigation/native'
import { type MusicTrack, playMusic } from '@utils'
import { useCallback } from 'react'

/**
 * Plays a looping background track while the screen is focused. `playMusic` is
 * idempotent, so screens sharing a track (Welcome + Levels) never restart it —
 * switching to a screen with a different track crossfades to that one.
 *
 * `isEnabled` lets a screen hold the track back until it has finished loading,
 * so music never plays over an empty background on a cold start.
 */
export const useBackgroundMusic = (
  track: MusicTrack,
  isEnabled = true
): void => {
  useFocusEffect(
    useCallback(() => {
      if (isEnabled) {
        playMusic(track)
      }
    }, [isEnabled, track])
  )
}
