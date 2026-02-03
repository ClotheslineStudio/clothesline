// src/lib/validation/appError.ts
export type AppErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  // allow feature-specific codes without fighting the type system:
  | (string & {});

export type AppError = {
  message: string;
  code?: AppErrorCode;
  hint?: string;
  fieldErrors?: Record<string, string>;
};

export type ErrorEnvelope = { error: AppError };

// Helpers (optional but nice for consistency)
export function appError(message: string, opts: Omit<AppError, 'message'> = {}): AppError {
  return { message, ...opts };
}

export function validationError(
  message = 'Validation failed.',
  fieldErrors?: Record<string, string>
): AppError {
  return { message, code: 'VALIDATION_ERROR', fieldErrors };
}

export function notFoundError(message = 'Not found.'): AppError {
  return { message, code: 'NOT_FOUND' };
}
