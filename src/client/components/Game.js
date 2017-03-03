import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  value: state,
})

const mapStateToDispatch = dispatch => ({
  gameStart: () => {
    dispatch({ type: 'CONNECT' })
  },
})

const Game = ({ gameStart }) => (
  <div>
    <p>Welcome</p>
    <button onClick={gameStart}>Start</button>
  </div>
)

Game.propTypes = {
  gameStart: React.PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapStateToDispatch)(Game)
