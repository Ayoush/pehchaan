import { describe, it, expect } from 'vitest';
import { validatePincode } from '../src/pincode.js';
import { ErrorCode } from '../src/errors.js';

describe('validatePincode', () => {
  it('accepts a valid pincode', () => {
    const result = validatePincode('400001');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.zone).toBe('4');
      expect(result.value.subzone).toBe('0');
    }
  });

  it('rejects pincode shorter than 6 digits', () => {
    const result = validatePincode('40000');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.SHAPE);
  });

  it('rejects pincode with leading zero', () => {
    const result = validatePincode('040001');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects pincode with non-digit characters', () => {
    const result = validatePincode('4000AB');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('accepts edge case: all 9s', () => {
    const result = validatePincode('999999');
    expect(result.ok).toBe(true);
  });
});
