import assert from 'assert';
import sinon from 'sinon';

import get, { set, unset, getAll } from '../src/index';

describe('cookie', () => {
  let clock;

  beforeEach(() => {
    global.document = {cookie: ''};
    clock = sinon.useFakeTimers({
      now: new Date(2019, 1, 1, 0, 0),
      shouldAdvanceTime: true,
      advanceTimeDelta: 20
    });
  });

  afterEach(() => {
    clock.restore();
  });

  it('set with days', () => {
    set('name', 'value', 1);
    assert.equal(global.document.cookie, 'name=value; expires=Fri, 01 Feb 2019 23:00:00 GMT; path=/');
  });
  it('set forever', () => {
    set('name', 'value');
    unset('name');
    assert.equal(global.document.cookie, 'name=; path=/');
    assert.equal(get('name'), '');
  });
  it('set and get', () => {
    set('name', 'value', 1);
    assert.equal(get('name'), 'value');
  });
  it('get not exist', () => {
    assert.equal(get('name2'), null);
  });
  it('invalid', () => {
    set('name', 'value;value', 1);
    assert.equal(JSON.stringify(getAll()), JSON.stringify({name: 'value'}));
  });
  it('set and getAll', () => {
    set('name', 'value', 1);
    assert.equal(JSON.stringify(getAll()), JSON.stringify({name: 'value'}));
  });
});

