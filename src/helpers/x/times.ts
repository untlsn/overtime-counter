/**
 * Create array of same element
 * @example
 * const arr = times(5, true);
 * arr -> [true, true, true, true, true]
 */
export const timesConst = <T>(length: number, value: T) => (
  length > 0 ? Array(length).fill(value) : []
);

/**
 * Create array mapped by callback
 * @example
 * const arr = timesMap(5, (num) => `# ${num}`);
 * arr -> ['# 0', '# 1', '# 2', '# 3', '# 4']
 */
export const timesMap = <T>(length: number, callback: (index: number) => T) => (
  timesConst(length, undefined).map((_val, i) => callback(i))
);

/**
 * Create array of number from 0 to length
 * @example
 * const arr = times(5);
 * arr -> [0, 1, 2, 3, 4]
 */
export const times = (length: number) => (
  timesMap(length, Number)
);

/**
 * Run callback many times
 * @return value will be ignored
 *
 * @example
 * const arr = [];
 *
 * timesFor(5, (i) => {
 *   arr.push(i)
 * })
 *
 * arr -> [0, 1, 2, 3, 4, 5]
 */
export const timesFor = (length: number, callback: (index: number) => void) => {
  for (let i = 0; i < length; i++) callback(i);
};
