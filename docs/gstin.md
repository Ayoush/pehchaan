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

### The character set: `MOD36_CHARS`

`MOD36_CHARS` is the ordered list of the 36 characters the checksum works with:

```
0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

A character's **value** is its index in this list (starting from 0):

| Characters | Values |
|------------|--------|
| `0`–`9` | 0–9 |
| `A`–`Z` | 10–35 (`A`=10, `B`=11, … `Z`=35) |

The same list converts the final number (0–35) back into the check character.

### Algorithm

For each of the first 14 characters, at position `i` (counting from 1):

1. **Look up its value** in `MOD36_CHARS`.
2. **Apply a weight:** multiply by 1 if `i` is odd, or by 2 if `i` is even.
3. **Split the product in base 36:** compute `product // 36` (quotient) and `product % 36` (remainder), and add them together.
4. **Add** that result to a running `sum`.

After all 14 characters:

```
check_value = (36 - sum % 36) % 36
```

The check character is `MOD36_CHARS[check_value]`.

The final `% 36` handles the case where `sum % 36` is 0. Without it, `36 - 0` would give 36, which is outside the alphabet. With it, the check value is 0 and the check character is `0`.

### Worked example

Using the synthetic GSTIN `27SYNTH0001S1Z?` (the `?` is the check character we are computing):

| Pos | Char | Value | Weight | Product | Quotient + Remainder |
|-----|------|-------|--------|---------|----------------------|
| 1 | `2` | 2 | 1 | 2 | 0 + 2 = 2 |
| 2 | `7` | 7 | 2 | 14 | 0 + 14 = 14 |
| 3 | `S` | 28 | 1 | 28 | 0 + 28 = 28 |
| 4 | `Y` | 34 | 2 | 68 | 1 + 32 = 33 |
| 5 | `N` | 23 | 1 | 23 | 0 + 23 = 23 |
| 6 | `T` | 29 | 2 | 58 | 1 + 22 = 23 |
| 7 | `H` | 17 | 1 | 17 | 0 + 17 = 17 |
| 8 | `0` | 0 | 2 | 0 | 0 |
| 9 | `0` | 0 | 1 | 0 | 0 |
| 10 | `0` | 0 | 2 | 0 | 0 |
| 11 | `1` | 1 | 1 | 1 | 0 + 1 = 1 |
| 12 | `S` | 28 | 2 | 56 | 1 + 20 = 21 |
| 13 | `1` | 1 | 1 | 1 | 0 + 1 = 1 |
| 14 | `Z` | 35 | 2 | 70 | 1 + 34 = 35 |

**Sum:** 2 + 14 + 28 + 33 + 23 + 23 + 17 + 0 + 0 + 0 + 1 + 21 + 1 + 35 = **198**

**Check value:** `(36 - 198 % 36) % 36 = (36 - 18) % 36 = 18`

**Check character:** `MOD36_CHARS[18]` = `I`

So the full synthetic GSTIN is `27SYNTH0001S1ZI`.

To validate a GSTIN, recompute the check character from the first 14 characters and compare it with position 15. A mismatch is reported as `CHECKSUM`.

## Synthetic example

`27ABCDE1234F1ZA` — Maharashtra, entity code 1. This is synthetic and does not correspond to a real registration.

## Error codes

| Code | Meaning |
|------|---------|
| `SHAPE` | Not 15 characters, or contains invalid characters |
| `CHECKSUM` | Check digit mismatch |
| `UNKNOWN_STATE` | State code not in the valid range |