import ReactDOM from 'react-dom'

const render = () => {
  const App = require('./App').default

  ReactDOM.render(<App />, document.getElementById('root'))
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render)
}
