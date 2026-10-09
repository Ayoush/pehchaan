import { ErrorCode, type ValidationResult } from './errors.js';
import { isValidStateCode } from './state-codes.js';

/** Decoded fields from a valid GSTIN. */
export type GstinValue = {
  raw: string;
  stateCode: string;
  pan: string;
  entityNumber: string;
  entityCode: string;
  checksum: string;
};

/** Mod-36 character set: 0-9 then A-Z. */
const MOD36_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function charValue(c: string): number {
  const idx = MOD36_CHARS.indexOf(c);
  if (idx === -1) throw new Error(`Unexpected char in GSTIN checksum: ${c}`);
  return idx;
}

/** Compute the GSTIN check digit using the GST checksum algorithm. */
export function computeGstinChecksum(s: string): string {
  // s is the first 14 chars of a GSTIN
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const val = charValue(s[i]!);
    const product = i % 2 === 0 ? val : val * 2;
    sum += Math.floor(product / 36) + (product % 36);
  }
  const remainder = sum % 36;
  return MOD36_CHARS[(36 - remainder) % 36]!;
}

/**
 * Validate a GSTIN (Goods and Services Tax Identification Number).
 * Normalises to uppercase before validation — lowercase input is accepted.
 */
export function validateGstin(raw: string): ValidationResult<GstinValue> {
  const s = raw.trim().toUpperCase();

  if (s.length !== 15) {
    return {
      ok: false,
      error: { code: ErrorCode.SHAPE, message: `GSTIN must be 15 characters, got ${s.length}` },
    };
  }

  const stateCode = s.slice(0, 2);
  if (!isValidStateCode(stateCode)) {
    return {
      ok: false,
      error: { code: ErrorCode.UNKNOWN_STATE, message: `Unknown GST state code: ${stateCode}` },
    };
  }

  // chars 3-12 must be a valid PAN
  const panSegment = s.slice(2, 12);
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!panRegex.test(panSegment)) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `GSTIN chars 3-12 must be a valid PAN pattern, got: ${panSegment}`,
      },
    };
  }

  // char 13: entity registration number (1-9, A-Z)
  const entityNumber = s[12]!;
  if (!/^[1-9A-Z]$/.test(entityNumber)) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `GSTIN char 13 must be 1-9 or A-Z, got: ${entityNumber}`,
      },
    };
  }

  // char 14: always 'Z'
  const entityCode = s[13]!;
  if (entityCode !== 'Z') {
    return {
      ok: false,
      error: { code: ErrorCode.FORMAT, message: `GSTIN char 14 must be 'Z', got: ${entityCode}` },
    };
  }

  // char 15: checksum
  const expectedChecksum = computeGstinChecksum(s.slice(0, 14));
  const actualChecksum = s[14]!;
  if (actualChecksum !== expectedChecksum) {
    return {
      ok: false,
      error: {
        code: ErrorCode.CHECKSUM,
        message: `GSTIN checksum mismatch: expected ${expectedChecksum}, got ${actualChecksum}`,
      },
    };
  }

  return {
    ok: true,
    value: {
      raw: s,
      stateCode,
      pan: panSegment,
      entityNumber,
      entityCode,
      checksum: actualChecksum,
    },
  };
}
