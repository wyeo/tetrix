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
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
]
const initialGame = new Game(initValue).getGame()

// const getTetri = () => tetris[Math.floor(Math.random() * tetris.length)]
const getTetri = () => tetris[0]

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end(':-)')
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
