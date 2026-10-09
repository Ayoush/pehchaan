# Privacy policy for fixtures

## Why all fixtures are synthetic

pehchaan validates format and checksum — it does not contact any government API or verify identity. But real PAN and Aadhaar numbers identify real people. Including them in a public open-source repository would be a privacy violation.

**Rule:** Every value in `fixtures/valid/` and `fixtures/invalid/` must be synthetically generated and must not correspond to a real person or business.

## What is synthetic?

A value is synthetic if it was created by an algorithm that produces format-valid values without using any real registration data. For GSTIN: a random PAN-shaped string with the correct mod-36 check digit, using a fictional state code. The `src/fixtures.ts` generator does exactly this.

## Aadhaar

Aadhaar numbers are not included in v1. The 12-digit format and Verhoeff checksum can be described, but no fixture values — not even generated ones that pass the checksum — will be shipped until the project has a clear policy reviewed by a legal expert.

## What to do if you spot a real number

Open a GitHub issue immediately. Do not include the number in the issue body — just describe where you found it. It will be removed and the commit history scrubbed.

## Contributor responsibility

If you add a fixture, you are asserting that the value is synthetic. The PR template asks you to confirm this explicitly.
