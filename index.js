'use strict';

const lib = require('./lib');

lib
  .getSimpleObservable()
  .subscribe(x => console.log(x));
