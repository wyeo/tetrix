import Rx from 'rxjs'
import { combineEpics } from 'redux-observable'
import { biggestLength } from '../../utils/index'

const windowKeyUpEpic = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(
      e => parseInt(e.keyCode, 10) === 38
      && getState().game.length !== 0
      // && getState().tetri.values[getState().tetri.position + 1]
      // && getState().tetri.x + biggestLength(
      //   getState().tetri.values[getState().tetri.position + 1],
      // ) <= 10
      && getState().tetri.type !== 'O',
    ).map(() => {
      if (getState().tetri.position + 1 <= 3 && getState().tetri.x + biggestLength(getState().tetri.values[getState().tetri.position + 1]) <= 10) {
        return { type: 'UPDATE_TETRI' }
      }
      return { type: 'UPDATE_TETRI' }
    })
    // .mapTo({
    //   type: 'UPDATE_TETRI',
    // })

// 37 === LEFT
const windowKeyLeftEpic = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(
      e => parseInt(e.keyCode, 10) === 37
      && getState().game.length !== 0
      && getState().tetri.x > 0)
    .map(() => ({
      type: 'CHANGE_X',
      value: getState().tetri.x - 1,
    }))

// 39 === RIGHT
const windowKeyRightEpic = (action$, { getState }) =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(
      e => parseInt(e.keyCode, 10) === 39
      && getState().game.length !== 0
      && getState().tetri.x + biggestLength(
          getState().tetri.values[getState().tetri.position],
        ) <= 9,
    )
    .map(() => ({
      type: 'CHANGE_X',
      value: getState().tetri.x + 1,
    }))

const emitValues = (action$, { getState }) =>
  action$.filter(action => action.type === 'START_GAME' || action.type === 'NEW_START_PREVIEW')
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
  windowKeyRightEpic,
  windowKeyLeftEpic,
  windowKeyUpEpic,
)

module.exports = rootEpic
