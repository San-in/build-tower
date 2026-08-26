import {
  type AudioPlayer,
  type AudioStatus,
  createAudioPlayer,
  setAudioModeAsync,
} from 'expo-audio'

/**
 * Gated sound manager. Two kinds of
 * audio:
 *   - MUSIC: looping background, one per screen. `playMusic` is idempotent — the
 *     same track already playing is not restarted (so Welcome→Levels is seamless).
 *   - SFX: one-shot. Playing an SFX DUCKS the music (lowers its volume); when the
 *     LAST SFX finishes (`didJustFinish` + no other SFX still playing) the music
 *     volume is restored. This self-corrects for overlaps / rapid re-triggers.
 *
 * The `enabled` flag is kept in sync with the `soundEnabled` setting by
 * SettingsProvider via `setSoundEnabled`.
 */
const MUSIC_SOURCES = {
  welcome: require('@assets/sounds/welcome_background.mp3'),
  level: require('@assets/sounds/level_background.mp3'),
}

const SFX_SOURCES = {
  button: require('@assets/sounds/button.mp3'),
  modal_open: require('@assets/sounds/modal_open.mp3'),
  result_modal_open: require('@assets/sounds/result_modal_open.mp3'),
  lose: require('@assets/sounds/lose.mp3'),
  celebration: require('@assets/sounds/celebration.mp3'),
  monkey_notification: require('@assets/sounds/monkey_notification.mp3'),
  monkey_noises: require('@assets/sounds/monkey_noises.mp3'),
  power_up: require('@assets/sounds/power_up.mp3'),
  success_fanfare: require('@assets/sounds/success_fanfare.mp3'),
}

const LOOP_SFX_SOURCES = {
  roulette: require('@assets/sounds/roulette.mp3'),
  building: require('@assets/sounds/building.mp3'),
}

export type MusicTrack = keyof typeof MUSIC_SOURCES
export type SfxName = keyof typeof SFX_SOURCES
export type LoopSfxName = keyof typeof LOOP_SFX_SOURCES

const MUSIC_VOLUME = 0.5
const DUCK_VOLUME = 0.4
const EXTRA_DUCK_VOLUME = 0.1
const SFX_LOOP_VOLUME = 0.4
const SFX_VOLUME = 0.2

let enabled = true
let currentTrack: MusicTrack | null = null
let audioModeReady = false
let audioModePromise: Promise<void> | null = null

const musicPlayers: Partial<Record<MusicTrack, AudioPlayer>> = {}
const sfxPlayers: Partial<Record<SfxName, AudioPlayer>> = {}
const loopSfxPlayers: Partial<Record<LoopSfxName, AudioPlayer>> = {}
const loopSfxGeneration: Partial<Record<LoopSfxName, number>> = {}

const ensureAudioMode = (): void => {
  if (audioModeReady) {
    return
  }
  audioModeReady = true
  try {
    audioModePromise = setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'mixWithOthers',
      shouldPlayInBackground: false,
    }).catch(() => {})
  } catch {
    // Native module not ready at import time — retry on the first play.
    audioModeReady = false
  }
}

const currentMusic = (): AudioPlayer | null =>
  currentTrack ? (musicPlayers[currentTrack] ?? null) : null

const pauseOtherMusic = (keep: MusicTrack): void => {
  Object.entries(musicPlayers).forEach(([track, player]) => {
    if (track !== keep) {
      player?.pause()
    }
  })
}

const restoreMusicVolume = (): void => {
  const music = currentMusic()
  if (music && enabled) {
    music.volume = MUSIC_VOLUME
    music.play()
  }
}

// On a cold start the very first music play() can be dropped: the audio session
// may still be resolving, and the player may not have finished loading its
// asset. Neither surfaces as an error and nothing (no ducking sfx) recovers it,
// so poll for a bounded window and re-assert playback until it actually sticks.
const MUSIC_START_RETRIES = 8
const MUSIC_START_RETRY_DELAY = 250

const reassertMusic = (track: MusicTrack, attempt = 0): void => {
  if (attempt >= MUSIC_START_RETRIES) {
    return
  }
  const retry = (): void => {
    const player = musicPlayers[track]
    if (currentTrack !== track || !enabled || !player || player.playing) {
      return
    }
    player.play()
    setTimeout(() => reassertMusic(track, attempt + 1), MUSIC_START_RETRY_DELAY)
  }
  // First pass waits for the audio session instead of racing it; the polling
  // that follows covers the player still loading its asset.
  if (attempt === 0 && audioModePromise) {
    void audioModePromise.then(retry)
    return
  }
  retry()
}

const anySfxPlaying = (): boolean =>
  Object.values(sfxPlayers).some((p) => p?.playing) ||
  Object.values(loopSfxPlayers).some((p) => p?.playing)

const handleSfxStatus = (status: AudioStatus): void => {
  if (!status.didJustFinish) {
    return
  }
  if (!anySfxPlaying()) {
    restoreMusicVolume()
  }
}

const getMusic = (track: MusicTrack): AudioPlayer => {
  let player = musicPlayers[track]
  if (!player) {
    player = createAudioPlayer(MUSIC_SOURCES[track])
    player.loop = true
    player.volume = MUSIC_VOLUME
    musicPlayers[track] = player
  }
  return player
}

const getSfx = (name: SfxName): AudioPlayer => {
  let player = sfxPlayers[name]
  if (!player) {
    player = createAudioPlayer(SFX_SOURCES[name])
    player.volume = SFX_VOLUME
    player.addListener('playbackStatusUpdate', handleSfxStatus)
    sfxPlayers[name] = player
  }
  return player
}

// `seekTo` is ASYNC. Firing play() straight after it can hit a player still
// parked at the end of its previous playback, and a player at EOF plays
// nothing — which is why a one-shot sfx occasionally went silent on a repeat
// trigger (celebration, fanfare). Rewind first, then play.
const playFromStart = (
  player: AudioPlayer,
  isStillWanted: () => boolean
): void => {
  const start = () => {
    if (isStillWanted()) {
      player.play()
    }
  }
  void player.seekTo(0).then(start, start)
}

const getLoopSfx = (name: LoopSfxName): AudioPlayer => {
  let player = loopSfxPlayers[name]
  if (!player) {
    player = createAudioPlayer(LOOP_SFX_SOURCES[name])
    player.loop = true
    player.volume = SFX_LOOP_VOLUME
    loopSfxPlayers[name] = player
  }
  return player
}

export const playMusic = (track: MusicTrack): void => {
  ensureAudioMode()
  pauseOtherMusic(track)
  if (currentTrack === track) {
    if (enabled) {
      getMusic(track).play()
    }
    return
  }
  const previous = currentMusic()
  if (previous) {
    previous.pause()
    void previous.seekTo(0)
  }
  currentTrack = track
  const music = getMusic(track)
  music.volume = MUSIC_VOLUME
  if (enabled) {
    music.play()
    reassertMusic(track)
  }
}

export const stopMusic = (): void => {
  const music = currentMusic()
  if (music) {
    music.pause()
    void music.seekTo(0)
  }
  currentTrack = null
}

export const playSfx = (name: SfxName): void => {
  if (!enabled) {
    return
  }
  ensureAudioMode()
  const music = currentMusic()
  if (music) {
    music.volume = name === 'celebration' ? EXTRA_DUCK_VOLUME : DUCK_VOLUME
  }
  playFromStart(getSfx(name), () => enabled)
}

export const startLoopSfx = (name: LoopSfxName): void => {
  if (!enabled) {
    return
  }
  ensureAudioMode()
  // Bumped by every start AND every stop, so a rewind that resolves after the
  // loop was already stopped can't resurrect it.
  const generation = (loopSfxGeneration[name] ?? 0) + 1
  loopSfxGeneration[name] = generation
  playFromStart(
    getLoopSfx(name),
    () => enabled && loopSfxGeneration[name] === generation
  )
}

export const stopLoopSfx = (name: LoopSfxName): void => {
  loopSfxGeneration[name] = (loopSfxGeneration[name] ?? 0) + 1
  loopSfxPlayers[name]?.pause()
  if (!anySfxPlaying()) {
    restoreMusicVolume()
  }
}

export const setSoundEnabled = (value: boolean): void => {
  enabled = value
  if (!value) {
    currentMusic()?.pause()
    Object.values(sfxPlayers).forEach((p) => p?.pause())
    Object.values(loopSfxPlayers).forEach((p) => p?.pause())
    return
  }
  const music = currentMusic()
  if (music && currentTrack) {
    music.volume = MUSIC_VOLUME
    music.play()
    reassertMusic(currentTrack)
  }
}

// Pre-create every player at import so a sound's first real `play()` isn't also
// the player's creation moment — that first play() gets dropped otherwise. This
// kills the "no sound on first trigger" race for all SFX, not just one screen.
const warmUpPlayers = (): void => {
  Object.keys(MUSIC_SOURCES).forEach((track) => getMusic(track as MusicTrack))
  Object.keys(SFX_SOURCES).forEach((name) => getSfx(name as SfxName))
  Object.keys(LOOP_SFX_SOURCES).forEach((name) =>
    getLoopSfx(name as LoopSfxName)
  )
}

// Configure the audio session as early as possible (at import), so the first
// playback isn't dropped by a not-yet-configured session.
ensureAudioMode()
warmUpPlayers()
