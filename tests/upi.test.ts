import { describe, it, expect } from 'vitest';
import { validateUpi } from '../src/upi.js';
import { ErrorCode } from '../src/errors.js';

describe('validateUpi', () => {
  it('accepts a valid UPI VPA', () => {
    const result = validateUpi('user@okicici');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.handle).toBe('user');
      expect(result.value.psp).toBe('okicici');
    }
  });

  it('normalises to lowercase', () => {
    const result = validateUpi('User@OKICICI');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.raw).toBe('user@okicici');
    }
  });

  it('rejects VPA without @', () => {
    const result = validateUpi('userokicici');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects VPA with handle starting with dot', () => {
    const result = validateUpi('.user@okicici');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects VPA with handle ending with dot', () => {
    const result = validateUpi('user.@okicici');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects empty handle', () => {
    const result = validateUpi('@okicici');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.SHAPE);
  });

  it('rejects empty PSP', () => {
    const result = validateUpi('user@');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.SHAPE);
  });
});
