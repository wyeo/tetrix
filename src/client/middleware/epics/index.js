import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import Rx from 'rxjs/Rx';

const windowKeyUpEpic = () =>
  Rx.Observable.fromEvent(document, 'keyup')
    .filter(e => parseInt(e.keyCode, 10) === 38)
    .map(e => ({
      type: 'UPDATE_TETRI',
      key: e.keyCode,
    }));

const rootEpic = combineEpics(windowKeyUpEpic)

module.exports = rootEpic
