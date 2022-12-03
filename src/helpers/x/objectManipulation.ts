import type { Booleanish } from '~/helpers/x/types';
import { identity } from '~/helpers/x/flow';

export type Dict<T = any> = Record<string, T>
export type DictKey<T> = keyof T & string
export type DictVal<T> = T[keyof T]
export type DictPair<T> = [key: DictKey<T>, val: DictVal<T>]
export type ObjectCallback<Obj extends Dict, Return> = (val: DictVal<Obj>, key: DictKey<Obj>, obj: Obj) => Return
export type AnyDictKey = string | number | symbol

/**
 * Native Object keys, but return keyof Obj instead of string
 *
 * @example
 * strictKeys({ a: 1, b: 2, c: 3 }) -> ('a' | 'b' | 'c')[]
 */
export const strictKeys = (
  Object.keys as <Obj extends Dict>(obj: Obj) => DictKey<Obj>[]
);

/**
 * Native Object entries, but return keyof Obj instead of string
 *
 * @example
 * strictEntries({ a: 1, b: 2, c: 3 }) -> [key: 'a' | 'b' | 'c', val: number][]
 */
export const strictEntries = (
  Object.entries as <Obj extends Dict>(obj: Obj) => DictPair<Obj>[]
);

/**
 * filter object like array
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 *
 * const even = pickBy(obj, (num) => num % 2 == 0);
 *
 * even -> { b: 2, d: 4 }
 */
export const pickBy = <Obj extends Dict>(obj: Obj, callback: ObjectCallback<Obj, Booleanish> = identity): Partial<Obj> => (
  Object.fromEntries(
    strictEntries(obj)
      .filter(([key, val]) => callback(val, key, obj)),
  ) as Partial<Obj>
);

/**
 * Work like pickBy, but only return keys
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 *
 * const even = pickBy(obj, (num) => num % 2 == 0);
 *
 * even -> ['b', 'd']
 */
export const pickKeysBy = <Obj extends Dict>(obj: Obj, callback: ObjectCallback<Obj, Booleanish> = identity): DictKey<Obj>[] => (
  strictEntries(obj)
    .filter(([key, val]) => callback(val, key, obj))
    .map(([key]) => key)
);

/**
 * Filter object by removing keys
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 * const omitted = omit(obj, ['a', 'b'])
 *
 * omitted -> { c: 3, d: 4, e: 5 }
 */
export const omit = <Obj extends Dict, Keys extends DictKey<Obj>>(obj: Obj, keys: Keys[] | Keys): Omit<Obj, Keys> => {
  const stringKeys: string[] = Array.isArray(keys) ? keys : [keys];
  return (
    pickBy(
      obj,
      (_val, key) => !stringKeys.includes(key),
    ) as Omit<Obj, Keys>
  );
};

/**
 * Filter object by picking keys
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 * const picked = pick(obj, ['a', 'b'])
 *
 * picked -> { a: 1, b: 2 }
 */
export const pick = <Obj extends Dict, Prop extends DictKey<Obj>>(obj: Obj, props: Prop[]): Pick<Obj, Prop> => {
  const stringKeys: string[] = Array.isArray(props) ? props : [props];

  return (
    pickBy(
      obj,
      (_val, key) => stringKeys.includes(key),
    ) as Pick<Obj, Prop>
  );
};

/**
 * Map values of object
 * @example
 * const obj = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e' }
 *
 * const doubled = mapKeys(obj, (_val, num) => num * 2)
 *
 * doubled -> { 2: 'a', 4: 'b', 6: 'c', 8: 'd', 10: 'e' }
 */
export const mapKeys = <Obj extends Dict, T extends AnyDictKey>(obj: Obj, callback: ObjectCallback<Obj, T>): Record<T, DictVal<Obj>> => (
  Object.fromEntries(
    strictEntries(
      obj,
    ).map(([key, val]) => [callback(val, key, obj), val]),
  ) as Record<T, DictVal<Obj>>
);

/**
 * Map keys of object
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 *
 * const doubled = mapValues(obj, (num) => num * 2)
 *
 * doubled -> { a: 2, b: 4, c: 6, d: 8, e: 10 }
 */
export const mapValues = <Obj extends Dict, T>(obj: Obj, callback: ObjectCallback<Obj, T>): Record<keyof Obj, T> => (
  Object.fromEntries(
    strictEntries(
      obj,
    ).map(([key, val]) => [key, callback(val, key, obj)]),
  ) as Record<keyof Obj, T>
);

/**
 * Map all values of object to same value
 * @example
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 *
 * const only0 = mapConstValues(obj, 0)
 *
 * only0 -> { a: 0, b: 0, c: 0, d: 0, e: 0 }
 */
export const mapConstValues = <Obj extends Dict, T>(obj: Obj, value: T): Record<DictKey<Obj>, T> => (
  Object.fromEntries(
    strictKeys(
      obj,
    ).map((key) => [key, value]),
  ) as Record<DictKey<Obj>, T>
);

/**
 * Iterate over object any return true if any of callback return truly value
 * @example
 * const empty = { a: 0, b: 0 };
 * const fill = { a: 0, b: 0, c: 2 };
 *
 * objSome(empty, (v) => v) -> false
 * // if callback is not defined function will use (v) => v
 * objSome(fill) -> true
 */
export const objSome = <Obj extends Dict>(obj: Obj, callback: ObjectCallback<Obj, Booleanish> = identity) => (
  strictEntries(
    obj,
  ).some(([key, val]) => callback(val, key, obj))
);

/**
 * Invert values and keys of object
 *
 * const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
 *
 * const inv = invert(obj);
 *
 * inv -> { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e' }
 */
export const invert = <Key extends AnyDictKey, Val extends AnyDictKey>(obj: Record<Key, Val>): Record<Val, Key> => (
  Object.fromEntries(
    strictEntries(
      obj,
    ).map(([key, val]) => [val, key]),
  ) as Record<Val, Key>
);
