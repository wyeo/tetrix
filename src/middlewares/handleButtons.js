import { biggestLength } from '../utils'

const handleButtons = ({ dispatch, getState }) => next => (action) => {
  if (action.type === 'LEFT_BUTTON'
  && getState().game.length !== 0 && getState().tetri.x > 0) {
    dispatch({
      type: 'CHANGE_X',
      value: getState().tetri.x - 1,
    })
  }
  if (action.type === 'RIGHT_BUTTON'
    && getState().game.length !== 0
    && getState().tetri.x + biggestLength(
      getState().tetri.values[getState().tetri.position]) <= 9) {
    dispatch({
      type: 'CHANGE_X',
      value: getState().tetri.x + 1,
    })
  }
  return next(action)
}

module.exports = handleButtons
