import Rx from 'rxjs'
import { combineEpics } from 'redux-observable'

const windowKeyUpEpic = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(
      e => parseInt(e.keyCode, 10) === 38 &&
      getState().game.length !== 0 &&
      getState().tetri.type !== 'O',
    )
    .mapTo(({ type: 'UPDATE_TETRI' }))

// 37 === LEFT
const windowKeyLeftEpic = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(e => parseInt(e.keyCode, 10) === 37 && getState().game.length !== 0)
    .map(() => ({
      type: 'CHANGE_X',
      value: getState().tetri.x - 1,
    }))
// 39 === RIGHT
const windowKeyRightEpic = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(e => parseInt(e.keyCode, 10) === 39 && getState().game.length !== 0)
    .map(() => ({
      type: 'CHANGE_X',
      value: getState().tetri.x + 1,
    }))

const emitValues = (action$, { getState }) =>
  action$.ofType('START_GAME')
    .switchMap(
      () => Rx.Observable.interval(1000)
      .map(y => ({
        type: 'NEW_PREVIEW',
        game: getState().game,
        tetri: getState().tetri.values,
        position: getState().tetri.position,
        x: getState().tetri.x,
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
