import * as x from 'x';
import { describe, it, expect } from 'vitest';

describe('times', () => {
  const length = 10;
  const uniqSymbol = Symbol('uniq');

  describe('timesConst', () => {
    const arr = x.timesConst(length, uniqSymbol);
    it('should return array with same value', () => {
      arr.forEach((v) => expect(v).toBe(uniqSymbol));
    });
    it('should return value with correct length', () => {
      expect(arr).toHaveLength(length);
    });
    it('should return empty array if length is negative', () => {
      expect(x.timesConst(-10, uniqSymbol)).toHaveLength(0);
    });
  });

  describe('timesMap', () => {
    it('should return array with same value', () => {
      const arr = x.timesMap(length, () => uniqSymbol);
      arr.forEach((v) => expect(v).toBe(uniqSymbol));
    });
    it('should return value with correct length', () => {
      const arr = x.timesMap(length, () => uniqSymbol);
      expect(arr).toHaveLength(length);
    });
    it('should return string with correct number', () => {
      const arr = x.timesMap(length, (i) => `-->${i}<--`);
      arr.forEach((v, i) => expect(v).toBe(`-->${i}<--`));
    });
  });

  describe('times', () => {
    it('should return value with correct length', () => {
      const arr = x.times(length);
      expect(arr).toHaveLength(length);
    });
    it('should return array with same value and index', () => {
      const arr = x.times(length);
      arr.forEach((v, i) => expect(v).toBe(i));
    });
  });

  describe('timesFor', () => {
    it(`should run callback ${length} times`, () => {
      let exec = 0;
      x.timesFor(length, () => {
        exec++;
      });
      expect(exec).toBe(length);
    });
  });
});
