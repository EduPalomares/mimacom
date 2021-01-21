import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../models/Product'

type Product = IProduct

let initialState: Product[] = []

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initialState,
  reducers: {
    addFavourite(state, { payload }: PayloadAction<Product>) {
      state.push(payload)
    }
  }
})

export const { addFavourite } = favouritesSlice.actions

export default favouritesSlice.reducer
