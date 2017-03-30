const _ = require('lodash')

const initValue = [
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
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
]

const tetriJ = [
  [1, 1, 0],
  [1, 0, 0],
  [1, 0, 0],
  [0, 0, 0],
]

const tetriS = [
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const tetriI = [
  [1],
  [1],
  [1],
  [1],
]

// const checkGame = (game, y, x) => _.chain(game[y])
//     .takeRight(game[y].length - x)
//     .every(t => t === 0)
//     .value()


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
  let state = false
  const tmpGame = game.slice()
  if (checkInsertion(y, x, tmpGame, tetri) && x >= 0 && x <= 9) {
    for (let i = 0; i < tetri.length; i += 1) {
      tetri[i].forEach((value, index) => {
        tmpGame[y + i] = tmpGame[y + i].map((v, a) => {
          if (value && x + index === a) {
            return value
          }
          return v
        })
      })
    }
  } else {
    state = true
  }
  return { state, tmpGame }
}

// console.log(checkInsertion(2, 4, initValue, tetriS))
// console.log(insertTetri(15, 0, initValue, tetriI))

const result = insertTetri(15, 0, initValue, tetriI)

// console.log(result)

for(const i in result.tmpGame) {
  console.log(result.tmpGame[i])
}

module.exports = insertTetri
