# Adding a New Validator

This guide explains how to add a new identifier validator to Pehchaan. It uses **TAN number** as a running example.

A validator checks whether an identifier follows its expected format and validation rules. Pehchaan performs offline format and checksum validation; it does not verify whether an identifier belongs to a real person or business.

## Before You Start

Make sure you have:

- Node.js 22 or later.
- pnpm 9 or later.
- Git installed.
- A fork of the Pehchaan repository.
- A clear understanding of the identifier's documented format and validation rules.

## Step-by-Step Guide

### 1. Understand the identifier's validation rules

Before writing code, identify the official format requirements for the new identifier.

For the TAN number example, first document the expected structure, character requirements, length, and any applicable validation rules.

Separate the requirements into individual checks, such as:

- Identifier length.
- Character format.
- Required prefixes or positions.
- Checksum rules, if applicable.

Do not invent validation rules. Use reliable documentation for the identifier being implemented.

### 2. Create the JSON specification

Create a new JSON file under `spec/rules/`.

For the TAN number example, create:

`spec/rules/tan.json`

Follow the existing specification format:

```json
{
  "validator": "tan",
  "version": "1",
  "rules": [
    {
      "id": "tan-length",
      "description": "TAN number must have the documented length.",
      "error_code": "SHAPE"
    },
    {
      "id": "tan-format",
      "description": "TAN number must follow the documented character format.",
      "error_code": "FORMAT"
    }
  ]
}
```

Each rule should have:

- `id`: A unique identifier for the rule.
- `description`: A clear explanation of the validation requirement.
- `error_code`: The appropriate error category, such as `SHAPE` or `FORMAT`.

Keep the specification consistent with the actual validator implementation.

### 3. Implement the validator

Create the validator source file under `src/`.

For the TAN number example:

`src/tan.ts`

Follow the existing validator structure, such as `src/pincode.ts`.

The implementation should:

- Accept the identifier as a string.
- Apply the documented validation rules.
- Return a consistent `ValidationResult`.
- Use the shared error codes from `src/errors.ts`.
- Avoid unnecessary network requests or external services.

Keep the implementation focused on format and checksum validation.

### 4. Write automated tests

Create a test file under `tests/`.

For the TAN number example:

`tests/tan.test.ts`

Follow the existing Vitest conventions used in files such as `tests/pincode.test.ts`.

Test cases should cover:

- A valid synthetic TAN example.
- An identifier with an incorrect length.
- An identifier with invalid characters.
- Invalid positions or prefixes, where applicable.
- Any additional documented validation rules.

Use synthetic test values only. **Never include real identifiers or personal data in fixtures or tests.**

If reusable fixture files are needed, follow the project's `fixtures/valid/` and `fixtures/invalid/` structure.

### 5. Export and register the validator

Make the new validator available through the package.

For the TAN number example:

- Export `validateTan` and its associated type from `src/index.ts`.
- Add an entry to `registry/rules.json`.
- Set the specification path to `spec/rules/tan.json`.
- Set the source path to `src/tan.ts`.
- Set the test path to `tests/tan.test.ts`.
- Record the validation coverage and missing rules accurately.

Only mark the validator as `"done"` when its implementation, specification, and tests are complete.

### 6. Run the project checks

Run the following commands from the project root:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test --run
```

These commands install dependencies, check code quality, verify TypeScript types, and execute the test suite.

The repository also provides `make dev`, which runs the equivalent development checks when Make is available.

Fix any errors before submitting your changes.

### 7. Review and submit your pull request

Before submitting:

- Review your changes with `git diff`.
- Confirm that no real identifiers or personal data were added.
- Confirm that all tests pass.
- Use a descriptive commit message.

Push your branch to your fork and open a pull request against `Ayoush/pehchaan`.

Include the following in your pull request description:

`Fixes #30`

Briefly explain the new validator, its specification, implementation, and test coverage.

Respond to automated reviewer feedback and make any requested corrections.

## Privacy and Security Rules

Pehchaan uses synthetic fixtures for a reason.

- Never commit real TAN, PAN, GSTIN, Aadhaar, or other personal identifiers.
- Never include personal information in test files, fixtures, screenshots, or documentation.
- Use clearly synthetic examples for all tests.
- Do not add KYC functionality or claim that format validation proves ownership or identity.

## Need Help?

Read `CONTRIBUTING.md` for general contribution instructions and review `spec/rules/`, `src/`, and `tests/` for existing examples.