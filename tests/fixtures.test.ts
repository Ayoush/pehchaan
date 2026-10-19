import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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
type ValidGstinFixture = {
  input: string;
};

type InvalidGstinFixture = {
  input: string;
  error: string;
};

const validGstinFixtures = JSON.parse(
  readFileSync(resolve(process.cwd(), 'fixtures/valid/gstin.json'), 'utf8'),
) as ValidGstinFixture[];

const invalidGstinFixtures = JSON.parse(
  readFileSync(resolve(process.cwd(), 'fixtures/invalid/gstin.json'), 'utf8'),
) as InvalidGstinFixture[];

describe('GSTIN validation fixtures', () => {
  it.each(validGstinFixtures)('accepts valid GSTIN input $input', ({ input }) => {
    expect(validateGstin(input).ok).toBe(true);
  });

  it.each(invalidGstinFixtures)(
    'rejects invalid GSTIN input $input with error $error',
    ({ input, error }) => {
      const result = validateGstin(input);

      expect(result.ok).toBe(false);

      if (!result.ok) {
        expect(result.error.code).toBe(error);
      }
    },
  );
});
