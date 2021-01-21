import { combineReducers } from '@reduxjs/toolkit'

import basketReducer from './basket'
import productsReducer from './products'
import uiReducer from './ui'

const rootReducer = combineReducers({
  basket: basketReducer,
  products: productsReducer,
  ui: uiReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
