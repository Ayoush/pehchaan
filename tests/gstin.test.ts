import { describe, it, expect } from 'vitest';
import { validateGstin, computeGstinChecksum } from '../src/gstin.js';
import { syntheticGstin } from '../src/fixtures.js';
import { ErrorCode } from '../src/errors.js';

describe('computeGstinChecksum', () => {
  it('returns correct checksum for known GSTIN prefix', () => {
    // Generate a synthetic GSTIN and verify its checksum independently
    const gstin = syntheticGstin('27', 1);
    const prefix = gstin.slice(0, 14);
    const checksum = computeGstinChecksum(prefix);
    expect(checksum).toBe(gstin[14]);
  });
});

describe('validateGstin', () => {
  it('accepts a valid synthetic GSTIN', () => {
    const gstin = syntheticGstin('27', 1);
    const result = validateGstin(gstin);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.stateCode).toBe('27');
    }
  });

  it('accepts lowercase input by normalising to uppercase', () => {
    const gstin = syntheticGstin('29', 2);
    const result = validateGstin(gstin.toLowerCase());
    expect(result.ok).toBe(true);
  });

  it('rejects input shorter than 15 chars', () => {
    const result = validateGstin('27ABCDE1234F1Z');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.SHAPE);
  });

  it('rejects input longer than 15 chars', () => {
    const result = validateGstin('27ABCDE1234F1ZABC');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.SHAPE);
  });

  it('rejects unknown state code', () => {
    const gstin = syntheticGstin('27', 1);
    const bad = '99' + gstin.slice(2);
    const result = validateGstin(bad);
    // 99 is valid (Centre Jurisdiction) — use 00 which is invalid
    const bad2 = '00' + gstin.slice(2);
    const result2 = validateGstin(bad2);
    expect(result2.ok).toBe(false);
    if (!result2.ok) expect(result2.error.code).toBe(ErrorCode.UNKNOWN_STATE);
  });

  it('rejects bad checksum', () => {
    const gstin = syntheticGstin('27', 1);
    // flip the last character
    const bad = gstin.slice(0, 14) + (gstin[14] === 'A' ? 'B' : 'A');
    const result = validateGstin(bad);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.CHECKSUM);
  });

  it('rejects GSTIN with invalid PAN segment', () => {
    // Replace PAN with all zeros
    const gstin = syntheticGstin('27', 1);
    const bad = gstin.slice(0, 2) + '0000000000' + gstin.slice(12);
    const result = validateGstin(bad);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });

  it('rejects GSTIN with char 14 not Z', () => {
    const gstin = syntheticGstin('27', 1);
    const bad = gstin.slice(0, 13) + 'X' + gstin.slice(14);
    const result = validateGstin(bad);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe(ErrorCode.FORMAT);
  });
});
