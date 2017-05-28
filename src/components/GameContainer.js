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
})

export default connect(mapStateToProps, mapStateToDispatch)(Game)
