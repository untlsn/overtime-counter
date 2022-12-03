import * as x from 'x';
import { describe, it, expect } from 'vitest';

describe('array', () => {
  let arr: string[] = [];
  beforeEach(() => {
    arr = ['a', 'b', 'c', 'd'];
  });

  describe('mutRemove', () => {
    it('should remove element from list', () => {
      x.mutRemove(arr, 'c');

      expect(arr).toEqual(['a', 'b', 'd']);
    });
    it('should return same list', () => {
      const mutArr = x.mutRemove(arr, 'c');

      expect(arr).toBe(mutArr);
    });
  });

  describe('mutAddOnes', () => {
    it('should add element when it\'s nop included', () => {
      const expectArr = [...arr, 'e'];
      x.mutAddOnes(arr, 'e');

      expect(arr).toEqual(expectArr);
    });

    it('should don\'t add element when it\'s included', () => {
      const expectArr = [...arr];
      x.mutAddOnes(arr, 'c');

      expect(arr).toEqual(expectArr);
    });

    it('should return same array', () => {
      const mutArr = x.mutAddOnes(arr, 'c');

      expect(mutArr).toBe(arr);
    });
  });

  describe('toSet', () => {
    it('should return set with same element as array', () => {
      const set = x.toSet(arr);

      expect(set).toBeInstanceOf(Set);
      expect([...set]).toEqual(arr);
    });
  });

  describe('groupBy', () => {
    const numArr = x.times(10);

    it('should group numbers by evens', () => {
      const groups = x.groupBy(numArr, (v) => v % 2);

      expect(groups[0]).toEqual([0, 2, 4, 6, 8]);
      expect(groups[1]).toEqual([1, 3, 5, 7, 9]);
    });
  });
});
