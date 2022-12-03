import { describe, it, expect } from 'vitest';
import { mutToggleInSet } from 'x';

describe('set', () => {
  describe('mutToggleInSet', () => {
    it('should mutate set', () => {
      const set = new Set();
      const mutSet = mutToggleInSet(set, 5);
      expect(mutSet).toBe(set);
    });
    it('should add element when not exist', () => {
      const set = new Set([5]);
      mutToggleInSet(set, 5);

      expect(set.has(5)).toBeFalsy();
    });
    it('should remove element when exist', () => {
      const set = new Set();
      mutToggleInSet(set, 5);

      expect(set.has(5)).toBeTruthy();
    });
  });
});
