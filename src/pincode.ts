import { ErrorCode, type ValidationResult } from './errors.js';

export type PincodeValue = {
  raw: string;
  zone: string;
  subzone: string;
};

/**
 * Validate an Indian pincode (postal index number).
 * Must be exactly 6 digits, no leading zero.
 * First digit = postal zone (1-9), second = subzone.
 */
export function validatePincode(raw: string): ValidationResult<PincodeValue> {
  const s = raw.trim();

  if (s.length !== 6) {
    return {
      ok: false,
      error: { code: ErrorCode.SHAPE, message: `Pincode must be 6 digits, got ${s.length} chars` },
    };
  }

  if (!/^[0-9]{6}$/.test(s)) {
    return {
      ok: false,
      error: { code: ErrorCode.FORMAT, message: `Pincode must contain only digits` },
    };
  }

  if (s[0] === '0') {
    return {
      ok: false,
      error: { code: ErrorCode.FORMAT, message: `Pincode must not start with 0` },
    };
  }

  return {
    ok: true,
    value: {
      raw: s,
      zone: s[0]!,
      subzone: s[1]!,
    },
  };
}
