import type { components } from './generated/openapi.js';
import { validateGstin } from './gstin.js';
import { validatePan } from './pan.js';
import { validateIfsc } from './ifsc.js';
import { validateUpi } from './upi.js';
import { validatePincode } from './pincode.js';

type Schemas = components['schemas'];

type Routes = {
  '/validate/gstin': Schemas['GstinResult'];
  '/validate/pan': Schemas['PanResult'];
  '/validate/ifsc': Schemas['IfscResult'];
  '/validate/upi': Schemas['UpiResult'];
  '/validate/pincode': Schemas['PincodeResult'];
};

export type HttpRequest = { method: string; path: string; body: unknown };

export type HttpResponse =
  | { status: 200; body: Routes[keyof Routes] }
  | { status: 400 | 404 | 405; body: Schemas['RequestError'] };


const validators: { [P in keyof Routes]: (value: string) => Routes[P] } = {
  '/validate/gstin': validateGstin,
  '/validate/pan': validatePan,
  '/validate/ifsc': validateIfsc,
  '/validate/upi': validateUpi,
  '/validate/pincode': validatePincode,
};

function isRoutePath(path: string): path is keyof Routes {
  return Object.prototype.hasOwnProperty.call(validators, path);
}

function hasStringValue(body: unknown): body is Schemas['ValidateRequest'] {
  return (
    typeof body === 'object' &&
    body !== null &&
    typeof (body as { value?: unknown }).value === 'string'
  );
}

export function handleRequest(req: HttpRequest): HttpResponse {
  if (!isRoutePath(req.path)) {
    return { status: 404, body: { message: 'Not found' } };
  }
  if (req.method !== 'POST') {
    return { status: 405, body: { message: 'Use POST' } };
  }
  if (!hasStringValue(req.body)) {
    return { status: 400, body: { message: 'Body must look like {"value": "..."}' } };
  }
  return { status: 200, body: validators[req.path](req.body.value) };
}