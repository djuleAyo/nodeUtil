export function areEqual(a: Set<any>, b: Set<any>): boolean {
  if (a.size !== b.size) return false;
  for (const _ of Array.from(a)) {
      if (!b.has(_)) {
          return false;
      }
  }
  return true;
}

export function union(a: Set<any>, b: Set<any>): Set<any> {
  return new Set([...Array.from(a), ...Array.from(b)]);
}

export function intersect(a: Set<any>, b: Set<any>): Set<any> {
  return new Set([...Array.from(a)].filter(x => b.has(x)));
}

export function difference(a: Set<any>, b: Set<any>): Set<any> {
  return new Set(
      [...Array.from(a)].filter(x => !b.has(x)));
}
