'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const Rx = require('rxjs/Rx.KitchenSink');
const lib = require('../lib');

chai.use(sinonChai);

describe('rxjs5 tests', () => {
  it('just schedule', done => {
    const s = new Rx.TestScheduler();
    s.schedule(() => {
      done();
    });
    s.flush();
  });

  it('testing for some observable', done => {
    lib.getSimpleObservable()
      .subscribe(
        () => {
        },
        () => {
        },
        () => done()
      );
  });
});
