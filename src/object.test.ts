import { assert } from "chai";
import {describe, it} from 'mocha';
import * as _ from 'lodash';

import {isPermutation} from "./array";
import { traverseObject } from "./object";

describe('traverse', () => {
  it('should do deep itterate all properties of an object', () => {
    let paths: string[]   = [];
    let object  = {
      c: {
        a: 1
      },
      a: 1,
    };

    traverseObject(object, (prop, path, isLeaf) => {
      paths = [...paths, path]
    });
    // suffix space is important - there is always an empty path for the root of the object
    assert.isTrue(isPermutation(paths, "c c.a a ".split(" ")))
  });

  it('should detect leafs correctly', () => {
    let leafs: string[]   = [];
    let object  = {
      c: {
        a: 3
      },
      a: 1,
    };

    traverseObject(object, (prop, path, isLeaf) => {
      if (isLeaf) leafs = [...leafs, prop];
    });

    assert.isTrue(isPermutation(leafs, [1, 3]));
  });
});