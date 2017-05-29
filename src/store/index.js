import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from '../reducers'
import previewTest from '../middlewares/previewTest'
import getElements from '../middlewares/getElements'
import handleButtons from '../middlewares/handleButtons'
import rootEpic from '../middlewares/epics'

/* eslint-disable no-underscore-dangle */

const configureStore = () => {
  const middlewares = []

  if (process.env.NODE_ENV !== 'production') {
    // middlewares.push(createLogger())
  }

  middlewares.push(createEpicMiddleware(rootEpic))

  middlewares.push(previewTest)
  middlewares.push(getElements)
  middlewares.push(handleButtons)

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
}

/* eslint-enable */

module.exports.store = configureStore()
