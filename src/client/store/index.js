import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from '../reducers/index'
import previewTest from '../middleware/previewTest'
import socketMiddleware from '../middleware/socket'
import rootEpic from '../middleware/epics/index'

const epicMiddleware = createEpicMiddleware(rootEpic)

const configureStore = () => {
  const middlewares = []

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }
  middlewares.push(epicMiddleware)
  middlewares.push(previewTest)
  middlewares.push(socketMiddleware)
  // middlewares.push(eventListener)

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares),
  )
}

module.exports.store = configureStore()
