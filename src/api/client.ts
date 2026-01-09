import createClient from 'openapi-fetch';
import type { paths, components } from './schema';

const API_BASE_URL = 'http://localhost:5000';

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
});

// Re-export schema types for convenience
export type CalendarEvent = components['schemas']['CalendarEvent'];
export type CreateEventDto = components['schemas']['CreateEventDto'];
export type UpdateEventDto = components['schemas']['UpdateEventDto'];
export type ApiError = components['schemas']['Error'];
