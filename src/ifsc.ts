import { ErrorCode, type ValidationResult } from './errors.js';

export type IfscValue = {
  raw: string;
  bankCode: string;
  branchCode: string;
};

/**
 * Validate an IFSC (Indian Financial System Code).
 * Does NOT normalise case — lowercase is rejected.
 * Format: AAAA0BBBBBB (4 alpha bank code, 0, 6 alphanumeric branch code)
 */
export function validateIfsc(raw: string): ValidationResult<IfscValue> {
  const s = raw.trim();

  if (s.length !== 11) {
    return {
      ok: false,
      error: { code: ErrorCode.SHAPE, message: `IFSC must be 11 characters, got ${s.length}` },
    };
  }

  // 5th character (index 4) must be '0'
  if (s[4] !== '0') {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `IFSC 5th character must be '0', got '${s[4]}'`,
      },
    };
  }

  // First 4 must be uppercase alpha only
  const bankCode = s.slice(0, 4);
  if (!/^[A-Z]{4}$/.test(bankCode)) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `IFSC bank code must be 4 uppercase letters, got: ${bankCode}`,
      },
    };
  }

  // Last 6 must be uppercase alphanumeric
  const branchCode = s.slice(5);
  if (!/^[A-Z0-9]{6}$/.test(branchCode)) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `IFSC branch code must be 6 uppercase alphanumeric chars, got: ${branchCode}`,
      },
    };
  }

  return {
    ok: true,
    value: { raw: s, bankCode, branchCode },
  };
}
