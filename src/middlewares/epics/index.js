import Rx from 'rxjs'
import { combineEpics } from 'redux-observable'
import { biggestLength } from '../../utils'

const keyUp = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(
      e => parseInt(e.keyCode, 10) === 38
      && getState().game.length !== 0
      && getState().tetri.type !== 'O')
    .mapTo({ type: 'UPDATE_TETRI' })

const keyLeft = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(
      e => parseInt(e.keyCode, 10) === 37
      && getState().game.length !== 0
      && getState().tetri.x > 0)
    .map(() => ({
      type: 'CHANGE_X',
      value: getState().tetri.x - 1,
    }))

const keyRight = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(
      e => parseInt(e.keyCode, 10) === 39
      && getState().game.length !== 0
      && getState().tetri.x + biggestLength(
          getState().tetri.values[getState().tetri.position],
        ) <= 9)
    .map(() => ({
      type: 'CHANGE_X',
      value: getState().tetri.x + 1,
    }))

const emitValues = (action$, { getState }) =>
  action$.ofType('START_GAME')
    .switchMap(
      () => Rx.Observable.interval(700)
      .map(y => ({
        type: 'NEW_PREVIEW',
        game: getState().game,
        tetri: getState().tetri.values,
        position: getState().tetri.position,
        x: getState().tetri.x,
        y: getState().yPosition + y,
      }))
      .takeUntil(
        action$.ofType('NEW_GAME_BOARD').merge(
          action$.ofType('NEW_PREVIEW_FORGET'),
          action$.ofType('GAME_OVER'),
        ),
      ),
  )

const rootEpic = combineEpics(
  emitValues,
  keyRight,
  keyLeft,
  keyUp,
)

module.exports = rootEpic
