import { combineReducers } from 'redux'
import { insertTetri } from '../utils/index'
import { initialGame } from '../utils/server'

const tetri = (state = [], action) => {
  switch (action.type) {
    case 'NEW_TETRI':
      return {
        type: action.value.type,
        position: action.value.position,
        x: action.value.x,
        values: action.value.value,
      }
    case 'CHANGE_X':
      return Object.assign({}, state, {
        x: action.value,
      })
    case 'UPDATE_TETRI':
      return Object.assign({}, state, {
        position: state.position < 3 ? state.position + 1 : 0,
      })
    default:
      return state
  }
}

const previewGame = (state = initialGame, action) => {
  const { y, x, game } = action

  switch (action.type) {
    case 'NEW_PREVIEW':
      if (insertTetri(y, x, game, action.tetri[action.position]).state === false) {
        return insertTetri(y, x, game, action.tetri[action.position]).tmpGame
      }
      return state
    case 'NEW_PREVIEW_FORGET':
      if (insertTetri(y, x, game, action.tetri[action.position]).state === false) {
        return insertTetri(y, x, game, action.tetri[action.position]).tmpGame
      }
      return state
    default:
      return state
  }
}

const game = (state = [], action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return action.value
    case 'NEW_GAME_BOARD':
      return action.value
    default:
      return state
  }
}

const yPosition = (state = 0, { type, value }) => {
  switch (type) {
    case 'NEW_POSITION_Y':
      return value
    default:
      return state
  }
}

const status = (state = '', action) => {
  switch (action.type) {
    case 'GAME_OVER':
      return 'GAME OVER'
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tetri,
  game,
  previewGame,
  status,
  yPosition,
})

module.exports = rootReducer
