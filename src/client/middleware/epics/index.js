import Rx from 'rxjs'
import { combineEpics } from 'redux-observable'

const windowKeyUpEpic = (action$, store) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(e => parseInt(e.keyCode, 10) === 38 && store.getState().game.length !== 0 && store.getState().tetri.type !== 'O')
    .mapTo(({ type: 'UPDATE_TETRI' }))

// const windowKeySpaceEpic = () =>
//   Rx.Observable.fromEvent(document, 'keyup')
//     .filter(e => parseInt(e.keyCode, 10) === 32)
//     .mapTo(({ type: 'START_GAME' }))

// 37 === LEFT
// 39 === RIGHT
const windowKeyLeftEpic = (action$, store) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(e => parseInt(e.keyCode, 10) === 37 && store.getState().game.length !== 0)
    .map(() => ({
      type: 'CHANGE_X',
      value: store.getState().tetri.x - 1,
    }))

const windowKeyRightEpic = (action$, store) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(e => parseInt(e.keyCode, 10) === 39 && store.getState().game.length !== 0)
    .map(() => ({
      type: 'CHANGE_X',
      value: store.getState().tetri.x + 1,
    }))

const emitValues = (action$, store) =>
  action$.ofType('START_GAME')
    .switchMap(
      () => Rx.Observable.interval(1000)
      .map(y => ({
        type: 'NEW_PREVIEW',
        game: store.getState().game,
        tetri: store.getState().tetri.values,
        position: store.getState().tetri.position,
        x: store.getState().tetri.x,
        y,
      }))
      .takeUntil(
        action$.ofType('NEW_GAME_BOARD').merge(action$.ofType('GAME_OVER')),
      ),
  )

const rootEpic = combineEpics(
  windowKeyRightEpic,
  windowKeyLeftEpic,
  windowKeyUpEpic,
  emitValues,
)

module.exports = rootEpic
