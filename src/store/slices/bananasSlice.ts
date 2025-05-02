import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BananasState {
  bananas: number
}

const initialState: BananasState = {
  bananas: 0,
}

const bananasSlice = createSlice({
  name: 'bananas',
  initialState,
  reducers: {
    addBananas: (state, { payload }: PayloadAction<number>) => {
      state.bananas += payload
    },
    removeBananas: (state, { payload }: PayloadAction<number>) => {
      state.bananas = Math.max(state.bananas - payload, 0)
    },
    setAllBananas: (state, { payload }: PayloadAction<number>) => {
      state.bananas = payload
    },
    resetBananas: (state) => {
      state.bananas = 0
    },
  },
})

export const { addBananas, removeBananas, setAllBananas, resetBananas } =
  bananasSlice.actions

export default bananasSlice.reducer
