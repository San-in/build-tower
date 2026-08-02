import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import { MARKET_SPECIAL_PRIZE, MarketPrize } from '@types'

// Transient UI state for the award success modal (NOT persisted). Lets the
// award bottom sheet (inside the ActivityModal) trigger the fullscreen success
// overlay, which ActivityModal renders inside itself via CustomModal.
export type AwardSuccessState = {
  isVisible: boolean
  title: string
  typePrize: MarketPrize
  countPrize: number
}

export interface AwardsUiState {
  success: AwardSuccessState
}

const initialState: AwardsUiState = {
  success: {
    isVisible: false,
    title: '',
    typePrize: MARKET_SPECIAL_PRIZE.Bananas,
    countPrize: 0,
  },
}

const awardsUiSlice = createSlice({
  name: 'awardsUi',
  initialState,
  reducers: {
    showAwardSuccess: (
      state,
      { payload }: PayloadAction<Omit<AwardSuccessState, 'isVisible'>>
    ) => {
      state.success = { ...payload, isVisible: true }
    },
    hideAwardSuccess: (state) => {
      state.success.isVisible = false
    },
  },
})

export const { showAwardSuccess, hideAwardSuccess } = awardsUiSlice.actions

export default awardsUiSlice.reducer

export const selectAwardSuccess = (state: RootState) => state.awardsUi.success
