import type { Booleanish } from '~/helpers/x/types';

export type Noop = () => undefined
/**
 * This function does nothing, useful for placeholders
 *
 * @return return undefined so can be treat like constant(undefined)
 */
export const noop: Noop = () => undefined;

export type Identity = <T>(value: T) => T;
/**
 * Return first param
 *
 * @example
 * const a = {};
 * const b = identity(a);
 *
 * a == b -> true
 */
export const identity: Identity = (v) => v;

/**
 * return array of elements, but with tuple type
 *
 * const a = ['', 0, false]
 * a -> (string | number | boolean)[];
 *
 * const b = asTuple('', 0, false)
 *
 * b -> [string, number, boolean]
 */
export const asTuple = <T extends any[]>(...tuple: T) => tuple;

/**
 * Return negate value
 * @example
 * negate(true) -> false
 * negate('value') -> false
 * negate(5) -> false
 *
 * negate(false) -> true
 * negate('') -> true
 * negate(0) -> true
 */
export const negate = (value: Booleanish) => !value;

/**
 * Create function returning first value
 * @example
 * const obj = {}
 *
 * const getObj = constant(obj);
 *
 * getObj() == obj -> true
 */
export const constant = <T>(value: T) => () => value;
