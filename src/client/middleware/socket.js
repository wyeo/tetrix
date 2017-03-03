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
        socket.on('connect_error', () => store.dispatch({ type: 'CONNECTING_ERROR' }))
        socket.on('connect', () => store.dispatch({ type: 'CONNECTED' }))
        return null
      case 'CONNECTED':

        socket.emit('getGame')
          .on('newGame', data => store.dispatch({ type: 'UPDATE_GAME', value: data.game }))
        socket.emit('getTetri')
          .on('newTetri', (data) => {
            store.dispatch({ type: 'CHANGE_TETRI', value: data.tetri })
            store.dispatch({ type: 'START_GAME' })
          })
        return null
      case 'GET_NEW_TETRI':
        socket.emit('getTetri')
          .on('newTetri', data => store.dispatch({ type: 'CHANGE_TETRI', value: data.tetri }))
        return null
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
