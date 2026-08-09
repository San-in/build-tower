import { useFocusEffect } from '@react-navigation/native'
import { type MusicTrack, playMusic } from '@utils'
import { useCallback } from 'react'

/**
 * Plays a looping background track while the screen is focused. `playMusic` is
 * idempotent, so screens sharing a track (Welcome + Levels) never restart it —
 * switching to a screen with a different track crossfades to that one.
 */
export const useBackgroundMusic = (track: MusicTrack): void => {
  useFocusEffect(
    useCallback(() => {
      playMusic(track)
    }, [track])
  )
}
