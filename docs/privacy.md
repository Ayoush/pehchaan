# Privacy policy for fixtures

## Why all fixtures are synthetic

pehchaan validates format and checksum — it does not contact any government API or verify identity. But real PAN and Aadhaar numbers identify real people. Including them in a public open-source repository would be a privacy violation.

**Rule:** Every value in `fixtures/valid/` and `fixtures/invalid/` must be synthetically generated and must not correspond to a real person or business.

## What is synthetic?

A value is synthetic if it was created by an algorithm that produces format-valid values without using any real registration data. For GSTIN: a PAN-shaped string built from the project-defined `SYNTH` prefix, with the correct mod-36 check digit. The `src/fixtures.ts` generator does exactly this.

## How to create a synthetic GSTIN

Generate GSTINs for tests with `syntheticGstin(stateCode, seq)` from `src/fixtures.ts`. Never copy GSTINs from real invoices, websites, or documents.

```ts
const gstin = syntheticGstin('27', 1);
// The PAN segment of this GSTIN is SYNTH0001S
```

The PAN-shaped segment (positions 3–12) is built as `SYNTH` + a 4-digit sequence + `S`:

| Part | Value for `seq = 1` | Meaning |
|------|---------------------|---------|
| `SYNTH` | `SYNTH` | Fixed prefix that marks the value as synthetic |
| 4-digit sequence | `0001` | Comes from the `seq` argument |
| `S` | `S` | Fixed final letter |

The generator builds the GSTIN prefix from the state code and this PAN segment, then calculates the mod-36 check digit.

### Why `SYNTH`?

`SYNTH` is a project-defined, human-readable marker. Anyone reading a fixture can tell at a glance that it is test data, and it is easy to search for. It is not derived from any real person's or business's name or registration data.

## Aadhaar

**Never use real Aadhaar numbers.**

Aadhaar numbers are not included in v1. The 12-digit format and Verhoeff checksum can be described, but no fixture values — not even generated ones that pass the checksum — will be shipped until the project has a clear policy reviewed by a legal expert.

## What to do if you spot a real number

This applies whether you spot a real identifier that someone else committed or you committed one yourself by accident.

Open a GitHub issue immediately. Do not include the number in the issue body — just describe where you found it. It will be removed and the commit history scrubbed.

## Contributor responsibility

If you add a fixture, you are asserting that the value is synthetic. The PR template asks you to confirm this explicitly.