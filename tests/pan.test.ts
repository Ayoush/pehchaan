import { describe, it, expect } from 'vitest';
import { validatePan } from '../src/pan.js';
import { ErrorCode } from '../src/errors.js';

describe('validatePan', () => {
  it('accepts a valid individual PAN', () => {
    const result = validatePan('ABCPE1234F');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.entityCode).toBe('P');
      expect(result.value.entityType).toBe('Individual');
    }
  });

  it('accepts a valid company PAN', () => {
    const result = validatePan('AAACP1234A');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.entityCode).toBe('C');
      expect(result.value.entityType).toBe('Company');
    }
  });

  it('accepts lowercase input by normalising', () => {
    const result = validatePan('abcpe1234f');
    expect(result.ok).toBe(true);
  });

  it('rejects PAN shorter than 10 chars', () => {
    const result = validatePan('ABCPE123');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.SHAPE);
  });

  it('rejects PAN with wrong structure', () => {
    const result = validatePan('12345ABCDE');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects PAN with unknown entity code', () => {
    // 4th char 'X' is not a valid entity code
    const result = validatePan('ABCXE1234F');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.ENTITY_TYPE);
  });
});
