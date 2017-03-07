const _ = require('lodash')

const initValue = [
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const tetriS = [
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const tetriI = [
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
]

const checkGame = (game, y, x) => _.chain(game[y])
    .takeRight(game[y].length - x)
    .every(t => t === 0)
    .value()

const checkInsertion = (y, x, game, tetri) => {
  const tmpGame = _.clone(game)
  let state = true

  for (let i = 0; i < tetri.length; i += 1) {
    tetri[i].forEach((value, index) => {
      if (value && tmpGame[y + i][x + index] === 1) {
        state = false
      }
    })
  }
  return state
}

/* Implementation of (x,y) "insertTetri" */
const insertTetri = (y, x, game, tetri) => {
  const tmpGame = game.slice()

  if (checkGame(game, y, x) && checkInsertion(y, x, game, tetri)) {
    for (let i = 0; i < tetri.length; i += 1) {
      tetri[i].forEach((value, index) => {
        if (value && !tmpGame[y + i][x + index]) {
          tmpGame[y + i][x + index] = value
        }
      })
    }
  } else {
    console.log('ERROR')
  }
  return tmpGame
}

console.log(insertTetri(3, 4, initValue, tetriI))
