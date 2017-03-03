import Game from './Game'
import { I, O, T, L, J, Z, S } from './Tetri'

const http = require('http')

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
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
]
const initialGame = new Game(initValue).getGame()


const getTetri = () => tetris[Math.floor(Math.random() * tetris.length)]

/* Implementation of (x,y) "insertTetri" */
// const insertTetri = (y, x, game, tetri) => {
//   const tmpGame = game.slice()
//
//   if (!tmpGame[y][x]) {
//     for (let i = 0; i < tetri.value.length; i += 1) {
//       tetri.value[i].map((value, index) => {
//         if (value && !tmpGame[y + i][x + index]) {
//           tmpGame[y + i][x + index] = value
//         }
//         return value
//       })
//     }
//   }
//   return tmpGame
// }

/* CLEAN WITH THE RIGHT SPATIAL POSTION IN ARRAY */
// let i = 0
// setInterval(() => {
//   if (i < 19) {
//     console.log(insertTetri(i, 3, initialGame, tetriO))
//     i += 1
//   }
// }, 1000)

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end(`
    :-)
  `)
})

const io = require('socket.io').listen(server)

io.on('connection', (socket) => {
  socket
    .on('getGame', () => {
      socket.emit('newGame', { game: initialGame })
    })
    .on('getTetri', () => {
      socket.emit('newTetri', { tetri: getTetri() })
    })
})

server.listen(3000)
