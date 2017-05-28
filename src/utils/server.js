import Game from './Game'
import { I, O, T, L, J, Z, S } from './Tetri'

const tetris = [I, O, T, L, J, Z, S]
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
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  Array(10).fill(0), // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const initialGame = new Game(initValue).getGame()
const getTetri = () => tetris[Math.floor(Math.random() * tetris.length)]

module.exports = {
  initialGame,
  getTetri,
}
