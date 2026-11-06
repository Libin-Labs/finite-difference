import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('linear first derivative', () => {
  assert.equal(api.centeredDerivative([-2, 0, 2], 1), 2);
});
test('quadratic second', () => {
  assert.equal(api.centeredDerivative([1, 0, 1], 1, 2), 2);
});
test('five-point cubic', () => {
  assert.equal(api.centeredDerivative([-8, -1, 0, 1, 8], 1), 0);
});
test('five-point quartic second', () => {
  assert.equal(api.centeredDerivative([16, 1, 0, 1, 16], 1, 2), 0);
});
test('invalid spacing and samples', () => {
  assert.throws(() => api.centeredDerivative([1, 2], 1));
  assert.throws(() => api.centeredDerivative([1, 2, 3], 0));
  assert.throws(() => api.centeredDerivative([1, NaN, 3], 1));
});
test('shifted quadratic oracle', () => {
  for (let x = -5; x <= 5; x += 0.25) {
    const h = 0.125,
      v = [x - h, x, x + h].map((t) => t * t + 3 * t);
    assert.ok(Math.abs(api.centeredDerivative(v, h) - (2 * x + 3)) < 1e-12);
    assert.equal(api.centeredDerivative(v, h, 2), 2);
  }
});
