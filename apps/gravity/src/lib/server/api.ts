export type ApiErrorCode =
  | 'VALIDATION'
  | 'UNSUPPORTED_MEDIA'
  | 'PAYLOAD_TOO_LARGE'
  | 'NOT_FOUND'
  | 'STORAGE_ERROR'
  | 'DB_ERROR'
  | 'INTERNAL';

export type ApiErrorBody = {
  ok: false;
  error: {
    code: ApiErrorCode;
    message: string;
    hint?: string;
  };
};

export function apiError(
  status: number,
  code: ApiErrorCode,
  message: string,
  hint?: string
) {
  const body: ApiErrorBody = { ok: false, error: { code, message, hint } };
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

export function apiOk<T>(data: T, status = 200) {
  return new Response(JSON.stringify({ ok: true, data }), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}
