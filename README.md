# pehchaan

> Checksum and format catalog for Indian business identifiers: GSTIN, PAN, IFSC, UPI VPA, vehicle registration, pincode.

**Synthetic fixtures only · No KYC · Offline · MIT**

[![CI](https://github.com/Ayoush/pehchaan/actions/workflows/ci.yml/badge.svg)](https://github.com/Ayoush/pehchaan/actions/workflows/ci.yml)

---

## Run it in 5 minutes

**Prerequisites:** Node 22+, pnpm 9+

```bash
git clone https://github.com/Ayoush/pehchaan.git
cd pehchaan
make dev
```

`make dev` installs dependencies, runs lint, typechecks, and runs the full test suite. All offline — no API keys, no KYC calls.

**In Codespaces or devcontainer:** click **Code → Codespaces → Create codespace on main** or **Reopen in Container** in VS Code.

---

## ⚠️ Do not use for KYC

This library validates **format and checksum only**. It cannot verify that an identifier belongs to a real person or business. Do not use it as a KYC (Know Your Customer) tool.

---

## What this is

Indian business workflows need identifier validation: does this GSTIN have a valid checksum? Is this PAN the right shape for a company? This repo catalogs the format rules as offline pure functions, with synthetic fixtures that prove each rule.

Real Aadhaar and PAN values are out of scope. See `docs/privacy.md`.

---

## Project layout

```
src/
  gstin.ts       # GSTIN validator (mod-36 checksum)
  pan.ts         # PAN format + entity type
  ifsc.ts        # IFSC bank code format
  upi.ts         # UPI VPA format
  pincode.ts     # Indian pincode shape
  state-codes.ts # 2-digit GST state codes
  errors.ts      # Stable error codes
  fixtures.ts    # Synthetic GSTIN generator
spec/rules/       # One JSON rule per identifier type
fixtures/
  valid/         # Synthetic valid examples
  invalid/       # Invalid examples with reason
docs/
  gstin.md       # GSTIN layout and checksum
  privacy.md     # Why fixtures are synthetic
  errors.md      # Error code reference
```

---

## Stack

| Layer | Tool |
|-------|------|
| Language | TypeScript 5, Node 22 |
| Testing | Vitest |
| Lint / Format | ESLint + Prettier |

---

## Contributing

New here? Start with a [`good first issue`](../../issues?q=label%3A%22good+first+issue%22). See [CONTRIBUTING.md](CONTRIBUTING.md).

Every PR is reviewed first by our AI reviewer (Gremlin) then by a human mentor.

For instructions on adding a new validator, see [Adding a New Validator](docs/adding-validators.md).
