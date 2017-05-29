import { connect } from 'react-redux'

import Game from './Game'

const mapStateToProps = ({ status, tetri, previewGame, game }) => ({
  tetri,
  previewGame,
  game,
  status,
})

const mapStateToDispatch = dispatch => ({
  gameStart: () => {
    dispatch({ type: 'BEGIN' })
  },
  clickLeft: () => {
    dispatch({ type: 'LEFT_BUTTON' })
  },
  clickRight: () => {
    dispatch({ type: 'RIGHT_BUTTON' })
  },
})

export default connect(mapStateToProps, mapStateToDispatch)(Game)
