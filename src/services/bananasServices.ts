import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppDispatch } from '@store/index'
import {
  addBananas as addBananasAction,
  removeBananas as removeBananasAction,
  resetBananas,
  setAllBananas,
} from '@store/slices/bananasSlice'

const STORAGE_KEY = 'bananas'

export const bananasService = {
  async initBananas(dispatch: AppDispatch) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)

    if (raw) {
      const bananas: number = JSON.parse(raw)
      dispatch(setAllBananas(bananas))
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(0))
      dispatch(setAllBananas(0))
    }
  },

  async reset(dispatch: AppDispatch) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(0))
    dispatch(resetBananas())
  },

  async addBananas(dispatch: AppDispatch, bananas: number) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    const current = raw ? JSON.parse(raw) : 0
    const updated = current + bananas

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    dispatch(addBananasAction(bananas))
  },

  async removeBananas(dispatch: AppDispatch, bananas: number) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    const current = raw ? JSON.parse(raw) : 0
    const updated = Math.max(current - bananas, 0)

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    dispatch(removeBananasAction(bananas))
  },
}
