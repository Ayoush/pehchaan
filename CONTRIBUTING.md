# Contributing to pehchaan

Welcome! pehchaan is part of **Intervues Lab**. This guide explains everything you need.

---

## Quick overview

1. Find an issue, comment `I'll take this` to claim it.
2. Fork → branch → code → tests → PR.
3. Gremlin (AI reviewer) comments. A human mentor approves.
4. Fix feedback, get merged.

---

## Fork and clone

```bash
git clone https://github.com/YOUR-USERNAME/pehchaan.git
cd pehchaan
git remote add upstream https://github.com/Ayoush/pehchaan.git
```

## Run the tests

```bash
make dev       # install + lint + typecheck + all tests
make test      # tests only
make lint      # lint only
```

## Commit style

Conventional Commits:

```
feat(gstin): add mod-36 checksum validation
fix(pan): reject space in PAN pattern
docs: explain why Aadhaar fixtures are synthetic
test(upi): trailing-dot VPA rejected
```

## Adding a rule

1. Create or update `spec/rules/<identifier>.json`.
2. Add at least one entry in `fixtures/valid/` and one in `fixtures/invalid/`.
3. Write a test in `src/<identifier>.test.ts`.
4. Update `registry/rules.json` — set `status` to `"done"`.
5. Run `make test`.

**Use synthetic data only.** Do not include real PAN, GSTIN, IFSC, or Aadhaar numbers.

## Adding a new validator

This guide explains how to add a validator to pehchaan. The example throughout is a **TAN number validator**. Treat the example as a naming and workflow guide; confirm the actual TAN validation requirements before implementing the rule.

### 1. Understand the existing validator

Start with [`src/pincode.ts`](src/pincode.ts). Read the implementation and identify its validation function, input handling, return type, naming conventions, and error-handling behaviour.

Follow the existing project conventions rather than introducing a new validator interface or dependency. The TAN number validator should behave consistently with the other validators.

### 2. Define the rule specification

Create a JSON specification under `spec/rules/`, following the naming convention and schema of the existing rule specifications.

For example, the TAN number rule could live in `spec/rules/tan.json`, if that filename follows the repository's convention.

Before writing the specification, inspect a neighbouring JSON file to confirm its required fields and data types. Document the rule's identifier, purpose, validation requirements, and relevant constraints using the existing format. Do not invent new schema fields without checking how the project consumes them.

### 3. Implement the validator

Create `src/tan.ts`, following the structure and coding conventions of `src/pincode.ts`.

The TAN number validator should:

- Accept the same kind of input expected by comparable validators.
- Apply the documented TAN format and validation requirements.
- Handle malformed input consistently with existing validators.
- Avoid logging or exposing the supplied identifier.
- Use clear names and focused logic.

Do not assume that matching a string pattern proves an identifier is genuine, issued, or active. Validate only what the implementation and specification can establish.

### 4. Add valid and invalid fixtures

Add representative test fixtures under `fixtures/valid/` and `fixtures/invalid/`, using the repository's existing fixture format and naming conventions.

Include cases for valid-format TAN numbers, malformed input, incorrect lengths, unexpected characters, and boundary conditions where applicable.

**Privacy rule: never use real identifiers in fixtures.** Do not copy actual TAN numbers or other real personal, financial, or government identifiers from documents, websites, logs, or production systems. Use synthetic test values only. Make clear that fixtures demonstrate validation behaviour and do not represent issued identifiers.

### 5. Write automated tests

Create `src/tan.test.ts`, following the conventions in existing validator tests.

Test both accepted and rejected inputs, including malformed values, empty input, whitespace, unexpected characters, and any relevant edge cases. Verify that the validator's result matches the behaviour defined by the specification.

Run the focused test suite during development, then run the complete test suite before opening a pull request.

### 6. Register the validator

Update `registry/rules.json` to include the TAN number rule, following the structure of existing entries. Use the correct identifier, metadata, and status values required by the registry.

Set `status` to `"done"` only when the rule is implemented and meets the project's completion criteria. Keep the registry entry consistent with the specification and implementation.

### 7. Export the validator

Update the root `index.ts` to export the TAN number validator using the same export convention as existing validators.

Check whether the validator should be available through a named export, a default export, or another established public API pattern. Do not expose additional internal implementation details unnecessarily.

### 8. Run checks and review the changes

Run the repository's development checks:

```bash
make dev
make test
make lint
```

Fix any failures before submitting your changes. Review the final diff to confirm that the implementation, JSON specification, fixtures, tests, registry, and public export are all consistent.

### 9. Submit a pull request

Create a focused branch for the TAN number validator and commit the changes using the project's Conventional Commits style.

Open a pull request against `Ayoush/pehchaan` and include `Fixes #30` in the description when working on issue #30. Explain what changed, which tests were run, and any assumptions made about the validation rules.

Address automated reviewer feedback, then request human mentor review. Submit only after verifying that the documented workflow and the actual implementation agree.

## What a good PR looks like

- One rule or fix per PR.
- All tests pass locally.
- PR description fills every section of the template.
- Names one alternative you rejected.

## Review flow

1. **Gremlin** posts automated feedback.
2. Fix issues, comment `ready for mentor review`.
3. **Human mentor** approves and merges.
