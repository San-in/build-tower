import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import { MARKET_PRODUCT } from '@types'

export type MarketState = Record<MARKET_PRODUCT, number>

export const initialState: MarketState = {
  [MARKET_PRODUCT.AddRandomBlocks_Bronze]: 0,
  [MARKET_PRODUCT.AddRandomBlocks_Silver]: 0,
  [MARKET_PRODUCT.AddRandomBlocks_Gold]: 0,
  [MARKET_PRODUCT.RemoveRandomBlocks_Bronze]: 0,
  [MARKET_PRODUCT.RemoveRandomBlocks_Silver]: 0,
  [MARKET_PRODUCT.RemoveRandomBlocks_Gold]: 0,
  [MARKET_PRODUCT.AddExtraStep]: 0,
}

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    incrementProduct: (state, { payload }: PayloadAction<MARKET_PRODUCT>) => {
      state[payload] += 1
    },
    decrementProduct: (state, { payload }: PayloadAction<MARKET_PRODUCT>) => {
      state[payload] = Math.max(0, state[payload] - 1)
    },
    setAllProducts: (state, { payload }: PayloadAction<MarketState>) => payload,
    resetMarket: () => initialState,
  },
})

export const selectMarket = (state: RootState) => state.market

export const selectTotalAddRandomBlocks = createSelector(
  selectMarket,
  (market) =>
    market[MARKET_PRODUCT.AddRandomBlocks_Bronze] +
    market[MARKET_PRODUCT.AddRandomBlocks_Silver] +
    market[MARKET_PRODUCT.AddRandomBlocks_Gold]
)

export const selectTotalRemoveRandomBlocks = createSelector(
  selectMarket,
  (market) =>
    market[MARKET_PRODUCT.RemoveRandomBlocks_Bronze] +
    market[MARKET_PRODUCT.RemoveRandomBlocks_Silver] +
    market[MARKET_PRODUCT.RemoveRandomBlocks_Gold]
)

export const {
  incrementProduct,
  setAllProducts,
  resetMarket,
  decrementProduct,
} = marketSlice.actions

export default marketSlice.reducer
