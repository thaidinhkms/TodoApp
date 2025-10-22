export type AppError = {
  message: string;
};

export type Result<T> =
  | { ok: true; value: T | undefined }
  | { ok: false; error: AppError };

export const ok = <T>(value?: T): Result<T | undefined> => ({
  ok: true,
  value,
});
export const err = <T>(error: AppError | string): Result<T> => {
  if (typeof error === 'string') {
    return { ok: false, error: { message: error } };
  }
  return { ok: false, error };
};
export const toAppError = (error: unknown): AppError =>
  typeof error === 'object' && error !== null && 'message' in error
    ? (error as AppError)
    : { message: 'Unexpected error' };
