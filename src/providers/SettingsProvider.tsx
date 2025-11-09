import AsyncStorage from '@react-native-async-storage/async-storage'
import { LANGUAGES } from '@types'
import * as Device from 'expo-device'
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Dimensions, PixelRatio, Platform } from 'react-native'

type SettingsState = {
  soundEnabled: boolean
  language: LANGUAGES
  isTablet: boolean
  hydrated: boolean
}

type SettingsActions = {
  toggleSound: () => void
  setLanguage: (lang: LANGUAGES) => Promise<void>
}

const STORAGE_KEYS = {
  soundEnabled: 'settings:soundEnabled',
  language: 'settings:language',
}

const guessTabletBySize = () => {
  const { width, height } = Dimensions.get('window')
  const smallestDp = Math.min(width, height) / PixelRatio.get()
  return smallestDp >= 600
}

const initialIsTablet =
  Device.deviceType === Device.DeviceType.TABLET ||
  (Platform.OS === 'ios' && Platform.isPad) ||
  (!Device.deviceType && guessTabletBySize())

const initial: SettingsState = {
  soundEnabled: true,
  language: LANGUAGES.EN,
  isTablet: initialIsTablet,
  hydrated: false,
}

export const SettingsContext = createContext<SettingsState & SettingsActions>({
  ...initial,
  toggleSound: () => {},
  setLanguage: async () => {},
})

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(initial.soundEnabled)
  const [language, setLanguageState] = useState<LANGUAGES>(initial.language)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const [sound, language] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.soundEnabled),
          AsyncStorage.getItem(STORAGE_KEYS.language),
        ])
        if (sound !== null) {
          setSoundEnabled(sound === 'true')
        }
        if (
          language &&
          Object.values(LANGUAGES).includes(language as LANGUAGES)
        ) {
          setLanguageState(language as LANGUAGES)
        }
      } finally {
        setHydrated(true)
      }
    }
    init()
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev
      AsyncStorage.setItem(
        STORAGE_KEYS.soundEnabled,
        next ? 'true' : 'false'
      ).catch(() => {})
      return next
    })
  }, [])

  const setLanguage = useCallback(
    async (newLanguage: LANGUAGES) => {
      if (newLanguage === language) {
        return
      }
      setLanguageState(newLanguage)
      await AsyncStorage.setItem(STORAGE_KEYS.language, newLanguage)
    },
    [language]
  )

  const value = useMemo(
    () => ({
      soundEnabled,
      language,
      isTablet: initialIsTablet,
      hydrated,
      toggleSound,
      setLanguage,
    }),
    [soundEnabled, language, hydrated, toggleSound, setLanguage]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
