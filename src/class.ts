export function methods(clazz: any): string[] {
  return clazz.prototype.keys();
}
