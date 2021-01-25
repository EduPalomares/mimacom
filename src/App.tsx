import { Provider } from 'react-redux'
import store from './store/store'
import KeyboardEvents, { useKEvents } from 'hocs/KeyboardEvents'

import 'overlayscrollbars/css/OverlayScrollbars.css'
import './App.css'
import Layout from './layout'

require('./helpers/setVH')

const App = () => {
  useKEvents()

  return (
    <>
      <Provider store={store}>
        <KeyboardEvents>
          <Layout />
        </KeyboardEvents>
      </Provider>
    </>
  )
}

export default App
