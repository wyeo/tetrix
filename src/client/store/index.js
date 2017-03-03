import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from '../reducers/index'
import eventListener from '../middleware/eventListener'
import socketMiddleware from '../middleware/socket'
import rootEpic from '../middleware/epics/index'

const epicMiddleware = createEpicMiddleware(rootEpic)

const configureStore = () => {
  const middlewares = []

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }
  middlewares.push(socketMiddleware)
  middlewares.push(eventListener)
  middlewares.push(epicMiddleware)

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares),
  )
}

module.exports.store = configureStore()
