/**
 * Discriminated union for API responses. Use everywhere the FE talks to the BE
 * so callers must explicitly handle both branches at the type level.
 */
export type APIResponse<T> = { success: true; data: T } | { success: false; error: string };

export function isSuccessResponse<T>(
  response: APIResponse<T>,
): response is { success: true; data: T } {
  return response.success;
}
