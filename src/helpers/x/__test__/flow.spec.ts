import * as x from 'x';
import { describe, it, expect } from 'vitest';

describe('flow', () => {
  describe('noop', () => {
    it('should do nothing', () => {
      x.noop();
    });
    it('should return undefined', () => {
      expect(x.noop()).toBeUndefined();
    });
  });

  describe('identity', () => {
    it('should return first parameter', () => {
      const uniqueSymbol = Symbol('uniq');

      expect(x.identity(uniqueSymbol)).toBe(uniqueSymbol);
    });
  });

  describe('asTuple', () => {
    it('should return array from params', () => {
      const arr = [1, 2, 3, 4, 5, 6];

      expect(x.asTuple(...arr)).toEqual(arr);
    });
  });

  describe('negate', () => {
    it('should return negate truly value', () => {
      const truly = [true, 'value', 10, {}, [], Symbol('true')];

      truly.forEach((v) => {
        expect(x.negate(v)).toBe(false);
      });
    });
    it('should return negate falsy value', () => {
      const falsy = [false, '', 0, undefined, null, NaN];

      falsy.forEach((v) => {
        expect(x.negate(v)).toBe(true);
      });
    });
  });

  describe('constant', () => {
    it('should return function return same value', () => {
      const uniqueSymbol = Symbol('uniq');

      const getUniq = x.constant(uniqueSymbol);

      expect(getUniq()).toBe(uniqueSymbol);
    });
  });
});
