import * as ExpoHaptics from 'expo-haptics'

/**
 * Gated wrapper around expo-haptics. Each trigger checks the module-level
 * `enabled` flag, so call sites stay IDENTICAL to the raw API — only the import
 * changes (`import { Haptics } from '@utils'`). SettingsProvider keeps the flag
 * in sync with the persisted `hapticsEnabled` setting via `setHapticsEnabled`.
 */
let enabled = true

export const setHapticsEnabled = (value: boolean): void => {
  enabled = value
}

export const Haptics = {
  ImpactFeedbackStyle: ExpoHaptics.ImpactFeedbackStyle,
  NotificationFeedbackType: ExpoHaptics.NotificationFeedbackType,
  impactAsync: (style?: ExpoHaptics.ImpactFeedbackStyle): Promise<void> =>
    enabled ? ExpoHaptics.impactAsync(style) : Promise.resolve(),
  selectionAsync: (): Promise<void> =>
    enabled ? ExpoHaptics.selectionAsync() : Promise.resolve(),
  notificationAsync: (
    type?: ExpoHaptics.NotificationFeedbackType
  ): Promise<void> =>
    enabled ? ExpoHaptics.notificationAsync(type) : Promise.resolve(),
}
