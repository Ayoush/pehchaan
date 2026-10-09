import { ErrorCode, type ValidationResult } from './errors.js';

/** Entity type decoded from PAN 4th character. */
export const ENTITY_TYPES: ReadonlyMap<string, string> = new Map([
  ['P', 'Individual'],
  ['C', 'Company'],
  ['H', 'Hindu Undivided Family'],
  ['F', 'Firm / LLP'],
  ['A', 'Association of Persons'],
  ['T', 'Trust'],
  ['B', 'Body of Individuals'],
  ['L', 'Local Authority'],
  ['J', 'Artificial Juridical Person'],
  ['G', 'Government'],
]);

export type PanValue = {
  raw: string;
  entityCode: string;
  entityType: string;
};

/**
 * Validate a PAN (Permanent Account Number).
 * Normalises to uppercase before validation.
 * Pattern: AAAAA9999A (5 alpha, 4 digit, 1 alpha)
 * 4th character indicates entity type.
 */
export function validatePan(raw: string): ValidationResult<PanValue> {
  const s = raw.trim().toUpperCase();

  if (s.length !== 10) {
    return {
      ok: false,
      error: { code: ErrorCode.SHAPE, message: `PAN must be 10 characters, got ${s.length}` },
    };
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!panRegex.test(s)) {
    return {
      ok: false,
      error: {
        code: ErrorCode.FORMAT,
        message: `PAN must match AAAAA9999A pattern`,
      },
    };
  }

  const entityCode = s[3]!;
  const entityType = ENTITY_TYPES.get(entityCode);
  if (!entityType) {
    return {
      ok: false,
      error: {
        code: ErrorCode.ENTITY_TYPE,
        message: `Unknown PAN entity code: ${entityCode}`,
      },
    };
  }

  return {
    ok: true,
    value: { raw: s, entityCode, entityType },
  };
}
