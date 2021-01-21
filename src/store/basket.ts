import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './store'
import { IProduct } from 'models/Product'
import { setProduct } from './products'

type Product = IProduct

let initialState: any = {}

const basketSlice = createSlice({
  name: 'basket',
  initialState: initialState,
  reducers: {
    clearBasket() {
      return initialState
    },

    setProductInBasket(state, { payload }: PayloadAction<Product>) {
      state[payload.id] = payload
    },

    rmvProductFromBasket(state, { payload }: PayloadAction<string>) {
      delete state[payload]
    }
  }
})

export const {
  clearBasket,
  setProductInBasket,
  rmvProductFromBasket
} = basketSlice.actions
export default basketSlice.reducer

export const addToBasket = (id: string): AppThunk => (dispatch, getState) => {
  const basket = getState().basket
  const products: any = getState().products
  const product = basket[id]

  product
    ? dispatch(setProductInBasket({ ...product, stock: product.stock + 1 }))
    : dispatch(setProductInBasket({ ...products[id], stock: 1 }))

  dispatch(setProduct({ ...products[id], stock: products[id].stock - 1 }))
}

export const rmvFromBasket = (id: string): AppThunk => (dispatch, getState) => {
  const basket = getState().basket
  const products: any = getState().products
  const product = basket[id]

  if (product) {
    product.stock > 1
      ? dispatch(setProductInBasket({ ...product, stock: product.stock - 1 }))
      : dispatch(rmvProductFromBasket(id))

    dispatch(setProduct({ ...products[id], stock: products[id].stock + 1 }))
  }
}
