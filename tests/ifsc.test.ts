import { describe, it, expect } from 'vitest';
import { validateIfsc } from '../src/ifsc.js';
import { ErrorCode } from '../src/errors.js';

describe('validateIfsc', () => {
  it('accepts a valid IFSC', () => {
    const result = validateIfsc('SBIN0001234');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.bankCode).toBe('SBIN');
      expect(result.value.branchCode).toBe('001234');
    }
  });

  it('rejects lowercase input (no normalisation)', () => {
    const result = validateIfsc('sbin0001234');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects IFSC with wrong length', () => {
    const result = validateIfsc('SBIN001234');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.SHAPE);
  });

  it('rejects IFSC where 5th char is not 0', () => {
    const result = validateIfsc('SBIN1001234');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects IFSC with non-alpha bank code', () => {
    const result = validateIfsc('1BIN0001234');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });
});
