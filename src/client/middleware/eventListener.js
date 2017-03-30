const eventListener = () => store => next => (action) => {
  switch (action.type) {
    case 'START_GAME':
      document.addEventListener('keydown', (e) => {
        switch (parseInt(e.keyCode, 10)) {
          case 37:
            store.dispatch({ type: 'KEYDOWN_LEFT' })
            break;
          case 38:
            store.dispatch({ type: 'KEYDOWN_UP' })
            break;
          case 39:
            store.dispatch({ type: 'KEYDOWN_RIGHT' })
            break;
          case 40:
            store.dispatch({ type: 'KEYDOWN_DOWN' })
            break;
          default:
        }
      })
      break;
    default:
      next(action)
  }
}

module.exports = eventListener()
