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

## What a good PR looks like

- One rule or fix per PR.
- All tests pass locally.
- PR description fills every section of the template.
- Names one alternative you rejected.

## Review flow

1. **Gremlin** posts automated feedback.
2. Fix issues, comment `ready for mentor review`.
3. **Human mentor** approves and merges.
