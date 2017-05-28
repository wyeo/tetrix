import React from 'react'
import PropTypes from 'prop-types'

const Line = ({ values }) => (
  <div>
    {values.map((val, i) => <span key={i}>{val}</span>)}
  </div>
)

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

const Game = ({ status, previewGame, game, gameStart }) => (
  <div>
    <button disabled={game.length > 0} onClick={gameStart}>Start</button>
    <p>Status : {status}</p>
    <br />
    <GameBoard values={previewGame} />
  </div>
)

export default Game
