const _ = require('lodash')

const biggestLength = tetri =>
  tetri.reduce((acc, v) => {
    if (v.length > acc) {
      return v.length
    }
    return acc
  }, 0)

const checkInsertion = (y, x, game, tetri) => {
  const tmpGame = _.clone(game)
  let state = true

  for (let i = 0; i < tetri.length; i += 1) {
    tetri[i].forEach((value, index) => {
      if (value && tmpGame[y + i] && tmpGame[y + i][x + index] === 1) {
        state = false
      }
    })
  }
  return state
}

const cleanLines = game => _.chain(game)
  .unshift(Array(10).fill(0))
  .differenceWith([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], _.isEqual)
  .value()

const checkLines = (game) => {
  let state = false
  game.forEach((value) => {
    if (_.isEqual(value, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])) {
      state = true
    }
  })
  return state
}

const insertTetri = (y, x, game, tetri) => {
  let state = false
  const tmpGame = game.slice()
  if (checkInsertion(y, x, tmpGame, tetri) && x >= 0 && x <= 9) {
    for (let i = 0; i < tetri.length; i += 1) {
      tetri[i].forEach((value, index) => {
        if (tmpGame[y + i]) {
          tmpGame[y + i] = tmpGame[y + i].map((v, a) => {
            if (value && x + index === a) {
              return value
            }
            return v
          })
        } else {
          state = true
        }
      })
    }
  } else {
    state = true
  }
  return { state, tmpGame }
}

module.exports = {
  insertTetri,
  checkLines,
  cleanLines,
  biggestLength,
}
