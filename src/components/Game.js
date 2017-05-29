import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

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

const Game = ({ status, previewGame, game, gameStart, clickLeft, clickRight }) => (
  <div>
    <p>Status : {status}</p>
    <br />
    <GameBoard values={previewGame} />
    <br />
    <Button.Group>
      <Button labelPosition={'left'} icon={'left chevron'} content={'Left'} onClick={clickLeft} />
      <Button disabled={game.length > 0} icon={'play'} content={'Play'} onClick={gameStart} />
      <Button labelPosition={'right'} icon={'right chevron'} content={'right'} onClick={clickRight} />
    </Button.Group>
  </div>
)

export default Game
