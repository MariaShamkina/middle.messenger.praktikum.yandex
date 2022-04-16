export function convertToArray<T>(obj: T | T[]): T[] {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  return [obj];
}
