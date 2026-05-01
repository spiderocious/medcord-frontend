import { type APIResponse } from '@shared/types/api-response';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  searchParams?: Record<string, string | number | boolean | undefined>;
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';

function buildUrl(path: string, searchParams?: RequestOptions['searchParams']): string {
  const url = new URL(
    path.startsWith('http') ? path : `${BASE_URL}${path}`,
    window.location.origin,
  );
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined) continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<APIResponse<T>> {
  const { body, searchParams, headers, ...rest } = options;
  try {
    const response = await fetch(buildUrl(path, searchParams), {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const message = await safeReadError(response);
      return { success: false, error: message };
    }

    const data = (await response.json()) as T;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown network error',
    };
  }
}

async function safeReadError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { error?: string; message?: string };
    return payload.error ?? payload.message ?? `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
