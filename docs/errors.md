# Error codes

All validation errors in pehchaan use stable string codes, not thrown strings. Error code constants are exported from `src/errors.ts`.

| Code | Meaning | Example |
|------|---------|----------|
| `SHAPE` | Wrong length or illegal characters | PAN shorter than 10 chars |
| `CHECKSUM` | Check digit mismatch | GSTIN last char wrong |
| `UNKNOWN_STATE` | State code not recognized | GSTIN starting with 99 |
| `ENTITY_TYPE` | Entity type character not in known set | PAN 4th char is not A–Z |
| `FORMAT` | Structure correct but a field value is invalid | IFSC 5th char is not 0 |

## Using error codes

```typescript
import { validateGstin, ErrorCode } from 'pehchaan';

const result = validateGstin('27ABCDE1234F1ZX'); // wrong check digit
if (!result.ok) {
  console.log(result.error.code); // 'CHECKSUM'
}
```

## Stability guarantee

Error code strings are stable across minor versions. Do not match on error messages — match on codes.
