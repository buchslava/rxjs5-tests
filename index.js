'use strict';

const lib = require('./lib');

lib
  .getSimpleObservable()
  .subscribe(x => console.log('simple', x));

lib
  .getFileReadObservable('./test/fixtures/example.csv')
  .subscribe(x => console.log('file read', x));

lib
  .recursiveReadDir('./test/fixtures')
  .subscribe(x => console.log('read recursive dir', x));

lib
  .getFolders('./test/fixtures')
  .subscribe(x => console.log('get folders', x));
