'use strict';

const Rx = require('rxjs');
const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');

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

function filesFilter(fileName) {
  return fileName && fileName[0] !== '.';
}

function readDir(observer, root, counter) {
  fs.readdir(root, (err, files)=> {
    if (!files || files.length === 0) {
      if (--counter === 0) {
        observer.complete();
      }
      return;
    }
    files
      .filter(filesFilter)
      .map(file => path.join(root, file))
      .forEach(function (file) {
        observer.next(file);
        fs.stat(file, (err, stats) => {
          if (stats && stats.isDirectory()) {
            return readDir(observer, file, counter++);
          }
          if (--counter === 0) {
            observer.complete();
          }
        })
      });
  })
}

exports.getSimpleObservable = () => Rx.Observable.from(data);
exports.getFileReadObservable = filePath => fr(filePath);
exports.recursiveReadDir = folder => {
  return Rx.Observable.create(observer => {
    observer.next(folder);
    return readDir(observer, folder, 1);
  });
};
exports.getFolders = path =>
  exports.recursiveReadDir(path)
    .filter(file => fs.lstatSync(file).isDirectory());
