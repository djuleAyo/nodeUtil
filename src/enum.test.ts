import { keys, values, pairs } from "./enum";
import { assert } from "chai";

import {describe, it} from 'mocha';

enum Test1 {
  AVOID = "avoid",
  ALL = "all",
  THE_TYPOS = "theTypos",
};
enum Test2 {
  FIRST, SECOND, MAYBE_THIRD
};

describe('keys', () => {
  it('should return names of enumeration as string array', () => {
    assert.deepEqual(keys(Test1), ["AVOID", "ALL", "THE_TYPOS"]);
    assert.deepEqual(["FIRST", "SECOND", "MAYBE_THIRD"], keys(Test2));
  });
});

describe('values', () => {
  it('should return all values of enumeration', () => {
    assert.deepEqual(["avoid", "all", "theTypos"], values(Test1));
  });

  it('should return empty array if no enumeration values are present', () => {
    assert.deepEqual([], values(Test2));
  });
});