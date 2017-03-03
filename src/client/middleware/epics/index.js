import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import Rx from 'rxjs/Rx';

import fromEvent from 'rxjs/observable/fromEvent';

const windowKeyUpEpic = () =>
  Rx.Observable.fromEvent(document, 'keyup')
    .map(event => ({
      type: 'KEY_UP',
      key: event.key,
      event,
    }));

const rootEpic = combineEpics(windowKeyUpEpic)

module.exports = rootEpic
