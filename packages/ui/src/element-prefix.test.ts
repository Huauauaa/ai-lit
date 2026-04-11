import { describe, expect, it } from 'vitest';
import { normalizeElementPrefix } from './element-prefix';

describe('normalizeElementPrefix', () => {
  it('lowercases and normalizes', () => {
    expect(normalizeElementPrefix('MyApp')).toBe('myapp');
    expect(normalizeElementPrefix('  acme  ')).toBe('acme');
    expect(normalizeElementPrefix('my-app')).toBe('my-app');
  });

  it('rejects empty', () => {
    expect(() => normalizeElementPrefix('')).toThrow();
    expect(() => normalizeElementPrefix('---')).toThrow();
  });

  it('rejects leading digit', () => {
    expect(() => normalizeElementPrefix('1ab')).toThrow();
  });

  it('rejects too long', () => {
    expect(() => normalizeElementPrefix('a'.repeat(33))).toThrow();
  });
});
