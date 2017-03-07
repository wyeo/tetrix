import { combineReducers } from 'redux'

const changeTetri = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_TETRI':
      return {
        type: action.value.type,
        position: action.position,
        values: action.value.value,
      }
    case 'UPDATE_TETRI':
      return Object.assign({}, state, {
        position: state.position < 4 ? state.position + 1 : 0,
      })
    default:
      return state
  }
}

const updateGame = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_GAME':
      return action.value
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tetri: changeTetri,
  game: updateGame,
})

module.exports = rootReducer
