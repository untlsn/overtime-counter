export type ArrayCallback<T, R> = (value: T, index: number, array: T[]) => R

/**
 * Remove element from array
 * @mutate
 * @return mutated array
 * @example
 * const arr = [1, 2, 3, 4, 5]
 * const arr2 = mutRemove(arr, 3)
 *
 * arr -> [1, 2, 4, 5]
 * arr2 -> [1, 2, 4, 5]
 * arr == arr2 -> true
 */
export const mutRemove = <T>(array: T[], element: T) => {
  const index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};

/**
 * Add new element only when it's not includes in array
 * @mutate
 * @return mutated array
 *
 * @example
 * const arr = [1, 2, 3, 4, 5]
 *
 * const arr2 = mutAddOnes(arr, 6)
 * arr2 -> [1, 2, 3, 4, 5, 6]
 *
 * const arr3 = mutAddOnes(arr, 3)
 * arr3 -> [1, 2, 3, 4, 5, 6]
 *
 * arr == arr2 && arr == arr3 -> true
 */
export const mutAddOnes = <T>(array: T[], element: T) => {
  if (!array.includes(element)) {
    array.push(element);
  }

  return array;
};

/**
 * Create Set from array
 * @return Set with data from array
 * @example
 * const arr = [1, 2, 3, 3, 3, 4, 5];
 *
 * const set = toSet(arr)
 *
 * set -> Set(1, 2, 3, 4, 5)
 */
export const toSet = <T>(array: T[]) => new Set(array);

/**
 * Group array object by values return from callback
 * @param array
 * @param callback
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6]
 *
 * const evenObj = groupBy(arr, (num) => String(num % 2 == 0))
 *
 * evenObj -> { "true": [2, 4, 6], "false": [1, 3, 5] }
 */
export const groupBy = <T, R extends string | number>(array: T[], callback: ArrayCallback<T, R>) => {
  const obj = {} as Record<R, T[]>;

  array.forEach((val, i, arr) => {
    const key = callback(val, i, arr);
    if (!obj[key]) {
      obj[key] = [val];
    } else {
      obj[key].push(val);
    }
  });

  return obj;
};

/**
 * Work like Array.at, but have better browser support
 * @example
 *
 * const arr = [1, 2, 3, 4, 5];
 *
 * arrayAt(arr, 2) -> 3
 * arrayAt(arr, -1) -> 5
 * arrayAt(arr, -2) == arr.at(-1) -> true
 */
export function arrayAt<T extends string>(str: T, index: number): string
export function arrayAt<T>(str: T[], index: number): T
export function arrayAt<T>(arr: T[], index: number) {
  return index >= 0 ? arr[index] : arr[arr.length + index];
}

/**
 * Return last element of array
 * @example
 *
 * const arr = [1, 2, 3, 4, 5];
 *
 * last(arr) -> 5
 */
export function last<T extends string>(str: T): string
export function last<T>(arr: T[]): T
export function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}

/**
 * Zip 3 elements
 * @example
 *
 * const arr1 = [1, 2, 3]
 * const arr2 = ['a', 'b', 'c']
 * const arr3 = [true, false, true]
 *
 * zip3(arr1, arr2, arr3) -> [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
 */
export const zip3 = <T1, T2, T3>(arr1: T1[], arr2: T2[], arr3: T3[]): [T1, T2 | undefined, T3 | undefined][] => (
  arr1.map((v, i) => [v, arr2[i], arr3[i]])
);
