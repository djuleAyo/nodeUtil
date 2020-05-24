import { reflect, isFullyReflected } from "./array";
import {range} from 'lodash'
import {assert} from 'chai';

describe('reflect', () => {
  it('should return an arary contains only elements of subject array, which are contained in mirror array', () => {
    // not tested with cmp because logic of reflect is what should be tested and not
    // ternary operator (yes unit tests are white box so I can rely on fact only diff
    // between cmp and w/o cmp is ternary flag)
    let mirror = range(0, 5);
    let subject1 = range(0, 10, 2);
    let subject2 = range(0, 3);
    assert.deepEqual(reflect(mirror, subject1), [0, 2, 4]);
    assert.isTrue(isFullyReflected(mirror, subject2));
  });
});