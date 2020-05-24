import { assert } from "chai";
import {describe, it} from 'mocha';
import * as _ from 'lodash';
import {exec as shx} from 'shelljs';
import { ftw } from "./fileSystem";
import {isPermutation} from "./array";
import * as path from 'path';

describe('ftw', () => {
  it('should be same as command find path -type f', async () => {
    let recieved: string[] = [];
    let [expected] = await Promise.all([
      shx('find ./src -type f').stdout,
      ftw('./src', file => (recieved.push(file)))
    ]);
    
    assert.isTrue(isPermutation(
      recieved, 
      expected.split('\n').filter((x: any) => x), 
      (a, b) => path.normalize(a) === path.normalize(b)
    ));
  });
});