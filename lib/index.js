'use strict';

const Rx = require('rxjs');
const parse = require('csv-parse');
const fs = require('fs');

const data = ['foo', 'bar'];

function fr(filePath) {
  const subject = new Rx.Subject();
  const parser = parse({});
  let record, output = [];
  parser.on('readable', function () {
    while (record = parser.read()) {
      subject.next(record);
    }
  });
  parser.on('error', function (err) {
    subject.error(err);
  });
  parser.on('finish', function () {
    subject.complete(output);
  });

  fs.createReadStream(filePath).pipe(parser);
  return subject;
}

exports.getSimpleObservable = () => Rx.Observable.from(data);
exports.getFileReadObservable = filePath => fr(filePath);
