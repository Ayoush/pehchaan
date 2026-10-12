/** Error codes returned by all validators. */
export const ErrorCode = {
  SHAPE: 'SHAPE',
  CHECKSUM: 'CHECKSUM',
  UNKNOWN_STATE: 'UNKNOWN_STATE',
  ENTITY_TYPE: 'ENTITY_TYPE',
  FORMAT: 'FORMAT',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type ValidationError = {
  code: ErrorCode;
  message: string;
};

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: ValidationError };
