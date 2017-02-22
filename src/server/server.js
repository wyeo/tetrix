const http = require('http')

const initialGame = [
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

const tetriI = {
  type: 'I',
  direction: 0,
  value: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

const tetriT = {
  type: 'T',
  direction: 0,
  value: [
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

const tetriL = {
  type: 'L',
  direction: 0,
  value: [
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

const tetriJ = {
  type: 'J',
  direction: 0,
  value: [
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

const tetriZ = {
  type: 'Z',
  direction: 0,
  value: [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

const tetriS = {
  type: 'S',
  direction: 0,
  value: [
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

const tetriO = {
  type: 'O',
  direction: 0,
  value: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

/* Implementation of (x,y) "insertTetri" */
const insertTetri = (y, x, game, tetri) => {
  const tmpGame = game.slice()

  if (!tmpGame[y][x]) {
    for (let i = 0; i < tetri.value.length; i += 1) {
      tetri.value[i].map((value, index) => {
        if (value && !tmpGame[y + i][x + index]) {
          tmpGame[y + i][x + index] = value
        }
        return value
      })
    }
  }
  return tmpGame
}

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
    HELLO
  `)
})

const io = require('socket.io').listen(server)

io.sockets
    .on('connection', () => {
      console.log('New Player !')
    })

server.listen(3000)
