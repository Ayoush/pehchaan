import { describe, expect, it } from 'vitest';
import { handleRequest } from '../src/http.js';

describe('handleRequest', () => {
  it('returns a success result for a valid PAN', () => {
    const res = handleRequest({
      method: 'POST',
      path: '/validate/pan',
      body: { value: 'ABCPE1234F' },
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ ok: true, value: { entityType: 'Individual' } });
  });

  it('returns a failure result (still status 200) for an invalid pincode', () => {
    const res = handleRequest({
      method: 'POST',
      path: '/validate/pincode',
      body: { value: '012345' },
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ ok: false, error: { code: 'FORMAT' } });
  });

  it('returns 404 for an unknown path', () => {
    const res = handleRequest({ method: 'POST', path: '/validate/nope', body: { value: 'x' } });
    expect(res.status).toBe(404);
  });

  it('returns 405 when the method is not POST', () => {
    const res = handleRequest({ method: 'GET', path: '/validate/pan', body: undefined });
    expect(res.status).toBe(405);
  });

  it('returns 400 when the body has no text value', () => {
    const res = handleRequest({ method: 'POST', path: '/validate/pan', body: { value: 123 } });
    expect(res.status).toBe(400);
  });
});