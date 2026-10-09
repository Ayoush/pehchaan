import { describe, it, expect } from 'vitest';
import { syntheticGstin, SYNTHETIC_GSTINS } from '../src/fixtures.js';
import { validateGstin } from '../src/gstin.js';

describe('syntheticGstin', () => {
  it('generates a valid GSTIN', () => {
    const gstin = syntheticGstin('27', 1);
    expect(gstin.length).toBe(15);
    const result = validateGstin(gstin);
    expect(result.ok).toBe(true);
  });

  it('generates unique GSTINs for different sequences', () => {
    const a = syntheticGstin('27', 1);
    const b = syntheticGstin('27', 2);
    expect(a).not.toBe(b);
  });

  it('generates GSTINs for different states', () => {
    const mh = syntheticGstin('27', 1);
    const dl = syntheticGstin('07', 1);
    expect(mh.slice(0, 2)).toBe('27');
    expect(dl.slice(0, 2)).toBe('07');
  });
});

describe('SYNTHETIC_GSTINS', () => {
  it('all pre-built GSTINs are valid', () => {
    for (const [name, gstin] of Object.entries(SYNTHETIC_GSTINS)) {
      const result = validateGstin(gstin);
      expect(result.ok, `${name}: ${gstin}`).toBe(true);
    }
  });
});
