import insertTetri from '../utils/index'

const previewTest = store => next => (action) => {
  if (action.type === 'NEW_PREVIEW') {
    const { y, x, game } = action
    if (insertTetri(y, x, game, action.tetri[action.position]).state === true && y < 2) {
      return store.dispatch({
        type: 'GAME_OVER',
      })
    }
    if (insertTetri(y, x, game, action.tetri[action.position]).state === true) {
      store.dispatch({
        type: 'NEW_GAME_BOARD',
        value: insertTetri(y - 1, x, game, action.tetri[action.position]).tmpGame,
      })
      store.dispatch({ type: 'GET_TETRI' })
      store.dispatch({ type: 'START_GAME' })
    }
  }
  next(action)
  return null
}

module.exports = previewTest
