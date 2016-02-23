'use strict';

const lib = require('./lib');

lib
  .getSimpleObservable()
  .subscribe(x => console.log(x));

lib
  .getFileReadObservable('./test/fixtures/example.csv')
  .subscribe(x => console.log(x));
