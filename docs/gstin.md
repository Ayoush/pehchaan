# GSTIN Format

> ⚠️ This document covers **format only**. pehchaan does not verify that a GSTIN belongs to a real registered business.

A GSTIN (Goods and Services Tax Identification Number) is exactly **15 characters**:

| Position | Length | Meaning | Example |
|----------|--------|---------|---------|
| 1–2 | 2 | State code (01–38) | 27 |
| 3–12 | 10 | PAN of the taxpayer | ABCDE1234F |
| 13 | 1 | Entity number at that PAN in that state | 1 |
| 14 | 1 | Always Z | Z |
| 15 | 1 | Check digit (mod-36 checksum) | A |

## Checksum

Position 15 is a mod-36 checksum over the first 14 characters. The checksum alphabet is `0–9A–Z` (36 values).

## Synthetic example

`27ABCDE1234F1ZA` — Maharashtra, entity code 1. This is synthetic and does not correspond to a real registration.

## Error codes

| Code | Meaning |
|------|---------|
| `SHAPE` | Not 15 characters, or contains invalid characters |
| `CHECKSUM` | Check digit mismatch |
| `UNKNOWN_STATE` | State code not in the valid range |
