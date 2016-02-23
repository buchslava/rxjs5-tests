'use strict';

const Rx = require('rxjs');
const data = ['foo', 'bar'];
exports.getSimpleObservable = () => Rx.Observable.from(data);
