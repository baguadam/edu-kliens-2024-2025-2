const assert = require('assert');
const app = require('../../src/app');

describe('\'solutions\' service', () => {
  it('registered the service', () => {
    const service = app.service('solutions');

    assert.ok(service, 'Registered the service');
  });
});
