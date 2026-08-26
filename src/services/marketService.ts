import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Store } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@store/index'
import {
  createInitialMarketState,
  MarketState,
  setAllProducts,
} from '@store/slices/marketSlice'

export const MARKET_STORAGE_KEY = 'market_purchases'
const STORAGE_KEY = MARKET_STORAGE_KEY

const isValidMarketState = (value: unknown): value is MarketState =>
  Boolean(value) && typeof value === 'object'

const loadPersistedMarket = async (): Promise<MarketState> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return createInitialMarketState()
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!isValidMarketState(parsed)) {
      return createInitialMarketState()
    }
    return { ...createInitialMarketState(), ...(parsed as MarketState) }
  } catch {
    return createInitialMarketState()
  }
}

const savePersistedMarket = async (data: MarketState) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))

const hydrateMarket = () => async (dispatch: AppDispatch) => {
  const persisted = await loadPersistedMarket()
  dispatch(setAllProducts(persisted))
}

const setupMarketPersistence = (store: Store<RootState>) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastPersisted = store.getState().market

  store.subscribe(() => {
    const market = store.getState().market

    if (market === lastPersisted) {
      return
    }
    lastPersisted = market
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      savePersistedMarket(market).catch(() => {})
    }, 250)
  })
}

export const marketService = {
  hydrateMarket,
  setupMarketPersistence,
}
