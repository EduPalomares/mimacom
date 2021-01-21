import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from 'models/Product'

let initialState = {}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    addProducts(state: any, { payload }: PayloadAction<IProduct[]>) {
      payload.forEach((o: IProduct) => {
        state[o.id] = o
      })
    },
    setProduct(state: any, { payload }: PayloadAction<IProduct>) {
      state[payload.id] = payload
    }
  }
})

export const { addProducts, setProduct } = productsSlice.actions

export default productsSlice.reducer
