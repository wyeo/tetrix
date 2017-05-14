import { insertTetri, cleanLines, checkLines } from '../utils/index'

const previewTest = store => next => (action) => {
  const { type, y, x, game, tetri, position } = action

  if (type === 'NEW_PREVIEW') {
    const { state } = insertTetri(y, x, game, tetri[position])
    const { tmpGame } = insertTetri(y - 1, x, game, tetri[position])
    if (state === true && y < 2) {
      store.dispatch({
        type: 'GAME_OVER',
      })
    }
    if (state === true) {
      store.dispatch({
        type: 'NEW_GAME_BOARD',
        value: checkLines(tmpGame) ? cleanLines(tmpGame) : tmpGame,
      })
      store.dispatch({ type: 'GET_TETRI' })
      store.dispatch({ type: 'START_GAME' })
    }
  }
  return next(action)
}

module.exports = previewTest
