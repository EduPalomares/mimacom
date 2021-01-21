import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUI } from '../models/UI'

let initialState: IUI = {
  visibleBasket: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setVisibleBasket(state: any, { payload }: PayloadAction<boolean>) {
      state.visibleBasket = payload
    }
  }
})

export const { setVisibleBasket } = uiSlice.actions

export default uiSlice.reducer
