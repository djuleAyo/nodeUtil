import assert from 'assert';
import {camelCase} from 'lodash'

export function keys(enumObject: any) {
  let keys = Object.keys(enumObject);
  return keys.filter(x => x.match(/[A-Z][A-Z_]*/))
}

export function values(enumObject: any) {
  let values = keys(enumObject).map(x => enumObject[x]);
  
  values = values.filter((x: string) => !(typeof x === 'number'));

  for (const value of values) assert(
    typeof value === 'number' || camelCase(value as string) === value,
    `Put camel case instead of ${value}`
  );

  return values;
}
export function pairs(enumObject: any) {
  return keys(enumObject).map(x => [x, enumObject[x]]);
}
