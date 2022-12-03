import * as x from 'x';
import { describe, it, expect } from 'vitest';

describe('objectManipulation', () => {
  describe('strictKeys', () => {
    it('should be Object.keys', () => {
      expect(x.strictKeys).toBe(Object.keys);
    });
  });

  describe('strictEntries', () => {
    it('should be Object.entries', () => {
      expect(x.strictEntries).toBe(Object.entries);
    });
  });

  describe('pickBy', () => {
    it('should pick even elements', () => {
      const obj = {
        a: 1, b: 2, c: 3, d: 4, e: 5,
      };
      const even = x.pickBy(obj || {}, (num) => num % 2 == 0);

      expect(even).toEqual({ b: 2, d: 4 });
    });
  });

  describe('pickKeysBy', () => {
    it('should work like pickBy, but return only keys', () => {
      const obj = {
        a: 1, b: 2, c: 3, d: 4, e: 5,
      };
      const even = x.pickKeysBy(obj || {}, (num) => num % 2 == 0);

      expect(even).toContain('b');
      expect(even).toContain('d');
    });
  });

  describe('omit', () => {
    it('should return object without keys', () => {
      const obj = {
        a: 1, b: 2, c: 3, d: 4, e: 5,
      };
      const omitted = x.omit(obj, ['a', 'b']);

      expect(omitted).toEqual({ c: 3, d: 4, e: 5 });
    });
  });

  describe('pick', () => {
    it('should return object with only keys', () => {
      const obj = {
        a: 1, b: 2, c: 3, d: 4, e: 5,
      };
      const picked = x.pick(obj, ['a', 'b']);

      expect(picked).toEqual({ a: 1, b: 2 });
    });
  });

  describe('mapKeys', () => {
    it('should change keys', () => {
      const obj = {
        1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e',
      };

      const doubled = x.mapKeys(obj, (_val, num) => num * 2);

      expect(doubled).toEqual({
        2: 'a', 4: 'b', 6: 'c', 8: 'd', 10: 'e',
      });
    });
  });

  describe('mapValues', () => {
    it('should change values', () => {
      const obj = {
        a: 1, b: 2, c: 3, d: 4, e: 5,
      };

      const doubled = x.mapValues(obj, (num) => num * 2);

      expect(doubled).toEqual({
        a: 2, b: 4, c: 6, d: 8, e: 10,
      });
    });
  });

  describe('mapConstValues', () => {
    it('should change values to same value', () => {
      const obj = {
        a: 1, b: 2, c: 3, d: 4, e: 5,
      };
      const uniqSymbol = Symbol('uniq');

      const onlySymbol = x.mapConstValues(obj, uniqSymbol);

      expect(onlySymbol).toEqual({
        a: uniqSymbol, b: uniqSymbol, c: uniqSymbol, d: uniqSymbol, e: uniqSymbol,
      });
    });
  });

  describe('objSome', () => {
    it('should return true if any element pass callback', () => {
      const fill = { a: 1, b: 3, c: 2 };

      expect(x.objSome(fill, (v) => v % 2 == 0)).toBeTruthy();
    });
    it('should return false if no element pass callback', () => {
      const empty = { a: 1, b: 3 };

      expect(x.objSome(empty, (v) => v % 2 == 0)).toBeFalsy();
    });
    it('should use identity when callback is not defined', () => {
      const empty = { a: false, b: false };
      const fill = { ...empty, c: true };

      expect(x.objSome(empty)).toBeFalsy();
      expect(x.objSome(fill)).toBeTruthy();
    });
  });

  describe('invert', () => {
    it('should invert values with keys', () => {
      const obj = {
        a: 1, b: 2, c: 3, d: 4, e: 5,
      };

      const inv = x.invert(obj);

      expect(inv).toEqual({
        1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e',
      });
    });
  });
});
