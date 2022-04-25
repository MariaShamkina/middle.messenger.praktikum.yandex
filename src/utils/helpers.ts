export function convertToArray<T>(obj: T | T[]): T[] {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  return [obj];
}

type notNullObject = Exclude<Object, null | undefined>;
function isNotNullObject(obj: unknown): obj is notNullObject {
  return obj !== null && typeof obj === 'object';
}

/* eslint-disable no-param-reassign */
export function merge(lhs: ModelData, rhs: ModelData): ModelData {
  Object.keys(rhs).forEach((key) => {
    try {
      if (isNotNullObject(rhs[key])) {
        rhs[key] = merge(lhs[key] as ModelData, rhs[key] as ModelData);
      } else {
        lhs[key] = rhs[key];
      }
    } catch (e) {
      lhs[key] = rhs[key];
    }
  });
  return lhs;
}
/* eslint-enable no-param-reassign */

export function setProp(
  object: ModelData | unknown,
  path: string,
  value: unknown,
): ModelData | unknown {
  if (!isNotNullObject(object) || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const newProp = path.split('.')
    .reduceRight<ModelData>((prev, curr) => ({ [curr]: prev }), value as any);
  return merge(object as ModelData, newProp);
}

export function isDeepEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null
      || !isNotNullObject(obj1) || !isNotNullObject(obj2)) return false;

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  return Object.keys(obj1).every((key) => {
    const currKey = key as keyof object;

    if (!(key in obj2)) return false;

    return isDeepEqual(obj1[currKey], obj2[currKey]);
  });
}
