import io from 'socket.io-client'

const socketMiddleware = () => {
  let socket = null

  return store => next => (action) => {
    switch (action.type) {
      case 'CONNECT':
        if (socket !== null) {
          socket.close()
        }
        store.dispatch({ type: 'CONNECTING' })
        socket = io('http://localhost:3000')
        const connect = new Promise((resolve, reject) => {
          socket.on('connect_error', () => reject('CONNECTING_ERROR'))
          socket.on('connect', () => resolve('CONNECTED'))
        })
        return connect.then(type => store.dispatch({ type }))
          .catch(type => store.dispatch({ type }))
      case 'GET_TETRI':
        socket.emit('getTetri')
        const newTet = new Promise((resolve) => {
          socket.on('newTetri', data => resolve(data.tetri))
        })
        return newTet.then(val => store.dispatch({
          type: 'NEW_TETRI',
          value: val,
          position: 0,
          x: 4,
        }))
      case 'CONNECTED':
        socket.emit('getGame')
        socket.emit('getTetri')
        const newGame = new Promise((resolve) => {
          socket.on('newGame', data => resolve({
            type: 'NEW_GAME_BOARD',
            data: data.game,
          }))
        })
        const newTetri = new Promise((resolve) => {
          socket.on('newTetri', data => resolve({
            type: 'NEW_TETRI',
            data: data.tetri,
          }))
        })
        const startGame = Promise.resolve({ type: 'START_GAME' })
        return Promise.all([newGame, newTetri, startGame]).then(values =>
          values.map(val =>
            store.dispatch({
              type: val.type,
              value: val.data || [],
              position: 0,
              x: 4,
            }),
          ),
        )
      case 'DISCONNECT':
        if (socket !== null) {
          socket.close()
        }
        socket = null
        return store.dispatch({ type: 'DISCONNECTED' })
      default:
        return next(action)
    }
  }
}

module.exports = socketMiddleware()
