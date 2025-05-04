import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppDispatch } from '@store/index'
import {
  decrementProduct,
  incrementProduct,
  initialState,
  MarketState,
  resetMarket,
  setAllProducts,
} from '@store/slices/marketSlice'
import { MARKET_PRODUCT } from '@types'

const STORAGE_KEY = 'market_purchases'

export const marketService = {
  async initMarket(dispatch: AppDispatch) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)

    if (raw) {
      const products: MarketState = JSON.parse(raw)
      dispatch(setAllProducts(products))
    } else {
      dispatch(resetMarket())
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    }
  },

  async reset(dispatch: AppDispatch) {
    dispatch(resetMarket())
    await AsyncStorage.removeItem(STORAGE_KEY)
  },

  async increment(dispatch: AppDispatch, product: MARKET_PRODUCT) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    const products: MarketState = raw ? JSON.parse(raw) : { ...initialState }
    products[product] = (products[product] || 0) + 1

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    dispatch(incrementProduct(product))
  },

  async decrement(dispatch: AppDispatch, product: MARKET_PRODUCT) {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    const products: MarketState = raw ? JSON.parse(raw) : { ...initialState }
    products[product] = Math.max((products[product] || 0) - 1, 0)

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    dispatch(decrementProduct(product))
  },
}
