const assert = require('assert');

const builMessage = require('../utils/buildMessage');

describe('utils - buildMessage', () => {
  describe('when receives an entity and action', () => {
    it('should return the respective message', () => {
      const result = builMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });
  describe('when receives an entity and an action and is a list', () => {
    it('should return the respective message the entity in plural', () => {
      const result = builMessage('movie', 'list');
      const expected = `movies listed`;
      assert.strictEqual(result, expected);
    });
  });
});
