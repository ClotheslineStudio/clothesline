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

/**
 * Creates an API error response with the specified status code and error details.
 * @param status - The HTTP status code for the error response.
 * @param code - The API error code identifying the type of error.
 * @param message - A human-readable error message.
 * @param hint - Optional additional context or suggestion to help resolve the error.
 * @returns A Response object with JSON-encoded error body and appropriate headers.
 */
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
