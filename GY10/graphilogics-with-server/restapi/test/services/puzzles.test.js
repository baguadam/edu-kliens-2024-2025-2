const assert = require('assert');
const app = require('../../src/app');

describe('\'puzzles\' service', () => {
  it('registered the service', () => {
    const service = app.service('puzzles');

    assert.ok(service, 'Registered the service');
  });
});
