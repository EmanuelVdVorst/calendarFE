import type { CalendarEvent } from '../types/calendar.types';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:5000';

interface CreateEventPayload {
  title: string;
  start: string; // ISO 8601 string
  end: string;   // ISO 8601 string
  color: string;
}

interface UpdateEventPayload {
  title?: string;
  start?: string;
  end?: string;
  color?: string;
}

// Convert Date to ISO string for API
function dateToISO(date: Date): string {
  return date.toISOString();
}

// Convert ISO string to Date from API
function isoToDate(iso: string): Date {
  return new Date(iso);
}

// Convert API response to CalendarEvent
function apiEventToCalendarEvent(apiEvent: Record<string, unknown>): CalendarEvent {
  return {
    id: apiEvent.id as string,
    title: apiEvent.title as string,
    start: isoToDate(apiEvent.start as string),
    end: isoToDate(apiEvent.end as string),
    color: apiEvent.color as string,
  };
}

// Convert CalendarEvent to API payload
function calendarEventToPayload(event: Omit<CalendarEvent, 'id'>): CreateEventPayload {
  return {
    title: event.title,
    start: dateToISO(event.start),
    end: dateToISO(event.end),
    color: event.color,
  };
}

export const eventsApi = {
  // Get all events
  async getAll(): Promise<CalendarEvent[]> {
    const response = await fetch(`${API_BASE_URL}/api/events`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    const data = await response.json() as Record<string, unknown>[];
    return data.map(apiEventToCalendarEvent);
  },

  // Get event by ID
  async getById(id: string): Promise<CalendarEvent> {
    const response = await fetch(`${API_BASE_URL}/api/events/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }
    const data = await response.json() as Record<string, unknown>;
    return apiEventToCalendarEvent(data);
  },

  // Create new event
  async create(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    const payload = calendarEventToPayload(event);
    const response = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`);
    }
    const data = await response.json() as Record<string, unknown>;
    return apiEventToCalendarEvent(data);
  },

  // Update event
  async update(id: string, updates: Partial<Omit<CalendarEvent, 'id'>>): Promise<CalendarEvent> {
    const payload: UpdateEventPayload = {};
    if (updates.title !== undefined) {
      payload.title = updates.title;
    }
    if (updates.start !== undefined) {
      payload.start = dateToISO(updates.start);
    }
    if (updates.end !== undefined) {
      payload.end = dateToISO(updates.end);
    }
    if (updates.color !== undefined) {
      payload.color = updates.color;
    }

    const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.statusText}`);
    }
    const data = await response.json() as Record<string, unknown>;
    return apiEventToCalendarEvent(data);
  },

  // Delete event
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`);
    }
  },
};
