import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from '../reducers/index'
import previewTest from '../middleware/previewTest'
import socketMiddleware from '../middleware/socket'
import rootEpic from '../middleware/epics/index'

const configureStore = () => {
  const middlewares = []

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }
  middlewares.push(createEpicMiddleware(rootEpic))
  middlewares.push(previewTest)
  middlewares.push(socketMiddleware)

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares),
  )
}

module.exports.store = configureStore()
