import { initialGame, getTetri } from '../utils/server'

const getElements = store => next => (action) => {
  if (action.type === 'BEGIN') {
    store.dispatch({ type: 'GET_GAME' })
    store.dispatch({ type: 'GET_TETRI' })
    store.dispatch({ type: 'START_GAME' })
  }
  if (action.type === 'GET_GAME') {
    store.dispatch({
      type: 'NEW_GAME',
      value: initialGame,
    })
  }
  if (action.type === 'GET_TETRI') {
    const { type, value } = getTetri()
    store.dispatch({
      type: 'NEW_TETRI',
      value: {
        type,
        value,
        position: 0,
        x: 4,
      },
    })
  }
  return next(action)
}

module.exports = getElements
