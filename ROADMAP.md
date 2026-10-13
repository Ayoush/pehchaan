# pehchaan — 12-week roadmap (Oct–Dec 2026)

## M1 — Foundation (wk 1–2, Oct 6–19)

**Goal:** Beginner track is open. CI is green. GSTIN and PAN validators work.

- [x] Repository setup, CI, devcontainer
- [ ] docs/gstin.md — 15 chars named, checksum explained
- [ ] docs/privacy.md — why fixtures are synthetic
- [ ] docs/errors.md — stable error code reference
- [ ] GSTIN mod-36 happy path tests
- [ ] PAN entity-type map tests

---

## M2 — Core product works end-to-end (wk 3–6, Oct 20 – Nov 16)

**Goal:** GSTIN, PAN, IFSC, UPI, and pincode validators are complete and tested.

- [ ] IFSC shape validator
- [ ] UPI VPA validator
- [ ] Pincode shape validator
- [ ] State code table through 38
- [ ] Synthetic GSTIN generator
- [ ] Vehicle registration rule (BH series + legacy)

---

## M3 — Advanced features (wk 7–10, Nov 17 – Dec 14)

**Goal:** TAN rule, bank-prefix table, property-style tests.

- [ ] Fix lowercase GSTIN accepted-then-recheckd wrong
- [ ] Fix PAN regex allowing space
- [ ] Fix UPI trailing dot accepted
- [ ] Fix state code 99 treated as valid
- [ ] Fix CHKSUM vs CHECKSUM error code typo
- [ ] TAN format rule
- [ ] Bank-prefix lookup for SBIN

---

## M4 — Polish and v1.0 (wk 11–12, Dec 15–28)

**Goal:** 10+ rules complete. Public v1.0 release.

- [ ] Property-style tests for all validators
- [ ] CHANGELOG.md
- [ ] v1.0 GitHub release
