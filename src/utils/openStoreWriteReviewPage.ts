import Constants from 'expo-constants'
import { Linking, Platform } from 'react-native'

/**
 * Native StoreReview only offers a star prompt, never a text field, so this
 * always deep-links straight to the store's write-a-review page instead.
 */
export const openStoreWriteReviewPage = async () => {
  const expoConfig = Constants.expoConfig
  const url =
    Platform.OS === 'ios'
      ? expoConfig?.ios?.appStoreUrl &&
        `${expoConfig.ios.appStoreUrl}?action=write-review`
      : expoConfig?.android?.playStoreUrl

  if (!url) {
    return
  }

  try {
    await Linking.openURL(url)
  } catch {
    // opening the store is best-effort — nothing to recover from here
  }
}
