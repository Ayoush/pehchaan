import { computeGstinChecksum } from './gstin.js';

/**
 * Generate a synthetic GSTIN for testing.
 * Uses SYNTHETIC in the PAN segment — these will never match a real taxpayer.
 * Format: {stateCode}SYNTH{seq:04d}1Z{checksum}
 */
export function syntheticGstin(stateCode: string, seq: number): string {
  // PAN-shaped segment: SYNTH + 4-digit seq + S (S = Services/SAC, safe choice)
  // Must be exactly 10 chars and match [A-Z]{5}[0-9]{4}[A-Z]
  const seqStr = String(seq).padStart(4, '0');
  const panSeg = `SYNTH${seqStr}S`;
  const prefix14 = `${stateCode}${panSeg}1Z`;
  if (prefix14.length !== 14) {
    throw new Error(`syntheticGstin: prefix must be 14 chars, got ${prefix14.length}`);
  }
  const checksum = computeGstinChecksum(prefix14);
  return `${prefix14}${checksum}`;
}

/** Pre-built synthetic GSTINs for use in tests. */
export const SYNTHETIC_GSTINS = {
  maharashtra: syntheticGstin('27', 1),
  delhi: syntheticGstin('07', 1),
  karnataka: syntheticGstin('29', 1),
  gujarat: syntheticGstin('24', 1),
} as const;
