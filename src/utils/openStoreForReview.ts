import * as StoreReview from 'expo-store-review'
import { Linking } from 'react-native'

export const openStoreForReview = async () => {
  try {
    if (await StoreReview.isAvailableAsync()) {
      await StoreReview.requestReview()
    } else {
      const url = StoreReview.storeUrl()
      if (url) {
        await Linking.openURL(url)
      }
    }
  } catch {
    // rating is best-effort — nothing to recover from here
  }
}
