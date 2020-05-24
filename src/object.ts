export function traverseObject(o: object, cb: (prop: any, path: string, isLeaf: boolean) => any): void {
  // todo get rid of reqursion cause objects may be large
  _traverse(o, cb, '')
}

let _traverse = (o: {[key: string]: any}, cb: (prop: any, path: string, isLeaf: boolean) => any, path: string): void => {
  let keys = Object.getOwnPropertyNames(o);
  cb(o, path, isComposite(o));
  for (const key of keys) _traverse(o[key], cb, `${path}${path ? "." : ""}${key}`);
}
export let isComposite = (o: any): boolean => !Object.keys(o).length;

// todo
export function dired(dirPath: string): object {
  return {};
}