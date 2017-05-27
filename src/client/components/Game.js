import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ status, tetri, previewGame, game }) => ({
  tetri,
  previewGame,
  game,
  status,
})

const mapStateToDispatch = dispatch => ({
  gameStart: () => {
    dispatch({ type: 'CONNECT' })
  },
})

const Line = ({ values }) => (
  <div>
    {values.map((val, i) => <span key={i}>{val}</span>)}
  </div>
)

const TetriBoard = ({ tetri }) => {
  const result = []
  const { position, type, values } = tetri

  if (values) {
    values[position].map((val, i) => result.push(<div key={i}>{val}</div>))
  }
  return (
    <div>
      <p>Position: {position}</p>
      <p>Type: {type}</p>
      {result}
    </div>
  )
}

const GameBoard = ({ values }) => {
  const result = []
  if (values) {
    values.map((val, i) => result.push(<Line key={i} values={values[i]} />))
  }
  return (
    <div>
      {result}
    </div>
  )
}

const Game = ({ status, tetri, previewGame, game, gameStart }) => (
  <div>
    <button disabled={game.length > 0} onClick={gameStart}>Start</button>
    <p>Status : {status}</p>
    {/* <TetriBoard tetri={tetri} /> */}
    <br />
    <GameBoard values={previewGame} />
    <br />
    {/* <GameBoard values={game} /> */}
  </div>
)

export default connect(mapStateToProps, mapStateToDispatch)(Game)
