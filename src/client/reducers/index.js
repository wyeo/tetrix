import { combineReducers } from 'redux'

const changeTetri = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_TETRI':
      return action.value
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
