import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/index'
import Game from './components/GameContainer'

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>, document.getElementById('main'),
)
