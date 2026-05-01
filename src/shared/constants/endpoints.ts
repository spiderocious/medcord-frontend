/**
 * Centralized API endpoints. Real endpoints are added here as features come online.
 * Keep paths relative to the API base URL; the api-client prefixes `VITE_API_BASE_URL`.
 */
export const Endpoints = {
  HEALTH: '/health',
} as const;

export type EndpointKey = keyof typeof Endpoints;
