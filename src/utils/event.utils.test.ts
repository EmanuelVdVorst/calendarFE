import { describe, it, expect } from 'vitest';
import type { CalendarEvent, WeekInfo, EventFormData } from '../types/calendar.types';
import {
  generateEventId,
  filterEventsByDay,
  filterEventsByWeek,
  sortEventsByStartTime,
  isEventInSlot,
  createEventFromFormData,
  validateEventTimes,
  getRandomEventColor,
  formatEventTime,
} from './event.utils';

describe('generateEventId', () => {
  it('generates unique IDs', () => {
    const id1 = generateEventId();
    const id2 = generateEventId();

    expect(id1).not.toBe(id2);
  });

  it('generates non-empty string', () => {
    const id = generateEventId();

    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
  });
});

describe('filterEventsByDay', () => {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Event 1',
      start: new Date('2024-01-15T10:00:00'),
      end: new Date('2024-01-15T11:00:00'),
      color: '#FF0000',
    },
    {
      id: '2',
      title: 'Event 2',
      start: new Date('2024-01-16T14:00:00'),
      end: new Date('2024-01-16T15:00:00'),
      color: '#00FF00',
    },
    {
      id: '3',
      title: 'Event 3',
      start: new Date('2024-01-15T14:00:00'),
      end: new Date('2024-01-15T16:00:00'),
      color: '#0000FF',
    },
  ];

  it('filters events for a specific day', () => {
    const date = new Date('2024-01-15');
    const result = filterEventsByDay(events, date);

    expect(result).toHaveLength(2);
    expect(result.map(e => e.id)).toContain('1');
    expect(result.map(e => e.id)).toContain('3');
  });

  it('returns empty array when no events on day', () => {
    const date = new Date('2024-01-20');
    const result = filterEventsByDay(events, date);

    expect(result).toHaveLength(0);
  });
});

describe('filterEventsByWeek', () => {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Event 1',
      start: new Date('2024-01-15T10:00:00'),
      end: new Date('2024-01-15T11:00:00'),
      color: '#FF0000',
    },
    {
      id: '2',
      title: 'Event 2',
      start: new Date('2024-01-22T14:00:00'),
      end: new Date('2024-01-22T15:00:00'),
      color: '#00FF00',
    },
  ];

  it('filters events for a specific week', () => {
    const week: WeekInfo = {
      weekNumber: 3,
      year: 2024,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      days: [],
    };

    const result = filterEventsByWeek(events, week);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});

describe('sortEventsByStartTime', () => {
  it('sorts events by start time', () => {
    const events: CalendarEvent[] = [
      {
        id: '1',
        title: 'Late Event',
        start: new Date('2024-01-15T14:00:00'),
        end: new Date('2024-01-15T15:00:00'),
        color: '#FF0000',
      },
      {
        id: '2',
        title: 'Early Event',
        start: new Date('2024-01-15T09:00:00'),
        end: new Date('2024-01-15T10:00:00'),
        color: '#00FF00',
      },
    ];

    const result = sortEventsByStartTime(events);

    expect(result[0].id).toBe('2');
    expect(result[1].id).toBe('1');
  });

  it('does not modify original array', () => {
    const events: CalendarEvent[] = [
      {
        id: '1',
        title: 'Event 1',
        start: new Date('2024-01-15T14:00:00'),
        end: new Date('2024-01-15T15:00:00'),
        color: '#FF0000',
      },
    ];

    const original = [...events];
    sortEventsByStartTime(events);

    expect(events[0].id).toBe(original[0].id);
  });
});

describe('isEventInSlot', () => {
  const event: CalendarEvent = {
    id: '1',
    title: 'Test Event',
    start: new Date('2024-01-15T10:00:00'),
    end: new Date('2024-01-15T12:00:00'),
    color: '#FF0000',
  };

  it('returns true when event overlaps with slot', () => {
    const date = new Date('2024-01-15');

    expect(isEventInSlot(event, date, 10)).toBe(true);
    expect(isEventInSlot(event, date, 11)).toBe(true);
  });

  it('returns false when event is before slot', () => {
    const date = new Date('2024-01-15');

    expect(isEventInSlot(event, date, 8)).toBe(false);
  });

  it('returns false when event is after slot', () => {
    const date = new Date('2024-01-15');

    expect(isEventInSlot(event, date, 14)).toBe(false);
  });

  it('returns false for different day', () => {
    const date = new Date('2024-01-16');

    expect(isEventInSlot(event, date, 10)).toBe(false);
  });
});

describe('createEventFromFormData', () => {
  it('creates event from form data', () => {
    const formData: EventFormData = {
      title: 'Test Event',
      startTime: '10:00',
      endTime: '12:00',
      date: new Date('2024-01-15'),
    };

    const result = createEventFromFormData(formData, '#FF0000');

    expect(result.title).toBe('Test Event');
    expect(result.color).toBe('#FF0000');
    expect(result.start.getHours()).toBe(10);
    expect(result.end.getHours()).toBe(12);
  });

  it('handles times with minutes', () => {
    const formData: EventFormData = {
      title: 'Test Event',
      startTime: '10:30',
      endTime: '12:45',
      date: new Date('2024-01-15'),
    };

    const result = createEventFromFormData(formData, '#FF0000');

    expect(result.start.getMinutes()).toBe(30);
    expect(result.end.getMinutes()).toBe(45);
  });
});

describe('validateEventTimes', () => {
  it('returns valid for correct times', () => {
    const result = validateEventTimes('10:00', '12:00');

    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('returns invalid when end is before start', () => {
    const result = validateEventTimes('14:00', '12:00');

    expect(result.valid).toBe(false);
    expect(result.error).toBe('End time must be after start time');
  });

  it('returns invalid when times are equal', () => {
    const result = validateEventTimes('12:00', '12:00');

    expect(result.valid).toBe(false);
    expect(result.error).toBe('End time must be after start time');
  });

  it('returns invalid when start time is empty', () => {
    const result = validateEventTimes('', '12:00');

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Start and end times are required');
  });

  it('returns invalid when end time is empty', () => {
    const result = validateEventTimes('10:00', '');

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Start and end times are required');
  });
});

describe('getRandomEventColor', () => {
  it('returns a hex color', () => {
    const color = getRandomEventColor();

    expect(color).toMatch(/^#[A-Fa-f0-9]{6}$/);
  });

  it('returns colors from predefined set', () => {
    const validColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

    // Run multiple times to test randomness
    for (let i = 0; i < 20; i++) {
      const color = getRandomEventColor();
      expect(validColors).toContain(color);
    }
  });
});

describe('formatEventTime', () => {
  it('formats event time range correctly', () => {
    const event: CalendarEvent = {
      id: '1',
      title: 'Test Event',
      start: new Date('2024-01-15T10:00:00'),
      end: new Date('2024-01-15T12:00:00'),
      color: '#FF0000',
    };

    const result = formatEventTime(event);

    expect(result).toBe('10:00 AM - 12:00 PM');
  });

  it('formats PM times correctly', () => {
    const event: CalendarEvent = {
      id: '1',
      title: 'Test Event',
      start: new Date('2024-01-15T14:30:00'),
      end: new Date('2024-01-15T16:45:00'),
      color: '#FF0000',
    };

    const result = formatEventTime(event);

    expect(result).toBe('2:30 PM - 4:45 PM');
  });

  it('formats noon correctly', () => {
    const event: CalendarEvent = {
      id: '1',
      title: 'Test Event',
      start: new Date('2024-01-15T12:00:00'),
      end: new Date('2024-01-15T13:00:00'),
      color: '#FF0000',
    };

    const result = formatEventTime(event);

    expect(result).toBe('12:00 PM - 1:00 PM');
  });

  it('pads single digit minutes', () => {
    const event: CalendarEvent = {
      id: '1',
      title: 'Test Event',
      start: new Date('2024-01-15T10:05:00'),
      end: new Date('2024-01-15T11:00:00'),
      color: '#FF0000',
    };

    const result = formatEventTime(event);

    expect(result).toBe('10:05 AM - 11:00 AM');
  });
});
