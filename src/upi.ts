import { ErrorCode, type ValidationResult } from './errors.js';

export type UpiValue = {
  raw: string;
  handle: string;
  psp: string;
};

/**
 * Validate a UPI Virtual Payment Address (VPA).
 * Normalises to lowercase.
 * Format: handle@psp — no leading/trailing dots in handle.
 */
export function validateUpi(raw: string): ValidationResult<UpiValue> {
  const s = raw.trim().toLowerCase();

  const atIdx = s.indexOf('@');
  if (atIdx === -1) {
    return {
      ok: false,
      error: { code: ErrorCode.FORMAT, message: `UPI VPA must contain '@'` },
    };
  }

  if (s.indexOf('@', atIdx + 1) !== -1) {
    return {
      ok: false,
      error: { code: ErrorCode.FORMAT, message: `UPI VPA must contain exactly one '@'` },
    };
  }

  const handle = s.slice(0, atIdx);
  const psp = s.slice(atIdx + 1);

  if (handle.length === 0) {
    return {
      ok: false,
      error: { code: ErrorCode.SHAPE, message: `UPI VPA handle (before @) must not be empty` },
    };
  }

  if (psp.length === 0) {
    return {
      ok: false,
      error: { code: ErrorCode.SHAPE, message: `UPI VPA PSP (after @) must not be empty` },
    };
  }

  if (handle.startsWith('.') || handle.endsWith('.')) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `UPI VPA handle must not start or end with a dot`,
      },
    };
  }

  // Only alphanumeric, dots, hyphens, underscores allowed in handle
  if (!/^[a-z0-9._-]+$/.test(handle)) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `UPI VPA handle contains invalid characters`,
      },
    };
  }

  // PSP must be a valid domain-like identifier
  if (!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(psp) && !/^[a-z0-9]$/.test(psp)) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `UPI VPA PSP is not a valid identifier`,
      },
    };
  }

  return {
    ok: true,
    value: { raw: s, handle, psp },
  };
}
