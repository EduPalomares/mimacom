import { Provider } from 'react-redux'
import store from './store/store'

import 'overlayscrollbars/css/OverlayScrollbars.css'
import './App.css'
import Layout from './layout'

require('./helpers/setVH')

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Layout />
      </Provider>
    </>
  )
}

export default App
