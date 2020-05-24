import * as _ from 'lodash';

export function reflect(mirror: Array<any>, array: Array<any>, cmp?: (a: any, b: any) => boolean)
: Array<any> {
  let comparison = cmp || ((a, b) => a === b);
  return array.filter(x => mirror.find(frag =>  comparison(x, frag)));
}
export function isFullyReflected(mirror: Array<any>, subject: Array<any>, cmp?: (a: any, b: any) => boolean)
: boolean { return reflect(mirror, subject, cmp).length === subject.length; }

export function isPermutation(a: any[], b: any[], cmp?: (a: any, b: any) => boolean) {
  return a.length === b.length && isFullyReflected(a, b, cmp);
}

/**
 * Returns how many times element e in contained in array a.
 * Comparison may be provided or === is used
 */
export function elementDegree<T>(a: Array<T>, e: T, cmp?: (a: T, b: T) => boolean) {
  let comparison = cmp || ((a, b) => a === b);
  return a.reduce((acc, cur) => comparison(cur, e) ? acc + 1 : acc, 0);
}

/**
 * Returns array of the same length as given array a. Each element in returned array
 * is replaced by {@link elementDegree} of that element
 */
export function degreeSignature<T>(a: Array<T>, cmp?: (a: T, b: T) => boolean): Array<number> {
  //TODO Current complexity is O(n^2) but O(n) is possible using a map of some sort
  let comparison = cmp || ((a, b) => a === b);
  let signed = new Set<number>();
  let degreeSignature: any = a.slice();

  for (let i = 0; i < a.length; i++) {
    if (signed.has(i)) continue;
    let degree = elementDegree(a, a[i]);
    degreeSignature = degreeSignature.map((x: T|number, j: number) => {
      // Cast should be safe since if it is not signed then its still of type T
      if(signed.has(j) || !comparison(x as T, a[i])) return x;
      signed.add(j);
      return degree;
    });
  }
  return degreeSignature;
}

// _degreeSignature_test();

/**
 * Checks if arrays a and b are permutations of each other.
 * Array with non unique elements are also allowed
 */
export function isPermutation2<T>(a: Array<T>, b: Array<T>, cmp?: (a: T, b: T) => boolean): boolean {
  let comparison = cmp || ((a, b) => a === b);
  if (a.length !== b.length) return false;

  let degreeA = degreeSignature(a);
  let degreeB = degreeSignature(b);

  for (let i = 0; i < a.length; i++) {
    let bIndex = b.findIndex(x => comparison(x, a[i]));
    if (bIndex < 0) return false;
    if (degreeB[bIndex] !== degreeA[i]) return false;
  }
  return true;
}
