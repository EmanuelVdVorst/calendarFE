import { describe, it, expect } from 'vitest';
import {
  getStartOfWeek,
  getEndOfWeek,
  getWeekDays,
  getWeekNumber,
  isSameDay,
  formatDayHeader,
  formatTime,
  getDateAtHour,
  isDateInWeek,
  addWeeks,
  getMonthName,
  getDayName,
} from './date.utils';

describe('getStartOfWeek', () => {
  it('returns Monday for a date in the middle of the week', () => {
    const wednesday = new Date('2024-01-17'); // Wednesday
    const result = getStartOfWeek(wednesday);

    expect(result.getDay()).toBe(1); // Monday
    expect(result.getDate()).toBe(15);
  });

  it('returns Monday for a Sunday', () => {
    const sunday = new Date('2024-01-21'); // Sunday
    const result = getStartOfWeek(sunday);

    expect(result.getDay()).toBe(1); // Monday
    expect(result.getDate()).toBe(15);
  });

  it('returns the same Monday if input is Monday', () => {
    const monday = new Date('2024-01-15'); // Monday
    const result = getStartOfWeek(monday);

    expect(result.getDay()).toBe(1);
    expect(result.getDate()).toBe(15);
  });

  it('sets time to midnight', () => {
    const date = new Date('2024-01-17T15:30:00');
    const result = getStartOfWeek(date);

    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });
});

describe('getEndOfWeek', () => {
  it('returns Sunday for any day in the week', () => {
    const wednesday = new Date('2024-01-17'); // Wednesday
    const result = getEndOfWeek(wednesday);

    expect(result.getDay()).toBe(0); // Sunday
    expect(result.getDate()).toBe(21);
  });

  it('sets time to end of day', () => {
    const date = new Date('2024-01-17');
    const result = getEndOfWeek(date);

    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
  });
});

describe('getWeekDays', () => {
  it('returns 7 consecutive days', () => {
    const monday = new Date('2024-01-15');
    const result = getWeekDays(monday);

    expect(result).toHaveLength(7);
    expect(result[0].getDate()).toBe(15);
    expect(result[6].getDate()).toBe(21);
  });

  it('returns dates in correct order', () => {
    const monday = new Date('2024-01-15');
    const result = getWeekDays(monday);

    for (let i = 1; i < result.length; i++) {
      expect(result[i].getTime()).toBeGreaterThan(result[i - 1].getTime());
    }
  });
});

describe('getWeekNumber', () => {
  it('returns correct week number for January 1st', () => {
    const jan1 = new Date('2024-01-01');
    const result = getWeekNumber(jan1);

    expect(result).toBe(1);
  });

  it('returns correct week number for mid-year date', () => {
    const july15 = new Date('2024-07-15');
    const result = getWeekNumber(july15);

    expect(result).toBeGreaterThan(28);
  });
});

describe('isSameDay', () => {
  it('returns true for same day', () => {
    const date1 = new Date('2024-01-15T10:00:00');
    const date2 = new Date('2024-01-15T18:30:00');

    expect(isSameDay(date1, date2)).toBe(true);
  });

  it('returns false for different days', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2024-01-16');

    expect(isSameDay(date1, date2)).toBe(false);
  });

  it('returns false for same day different month', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2024-02-15');

    expect(isSameDay(date1, date2)).toBe(false);
  });
});

describe('formatDayHeader', () => {
  it('formats Monday correctly', () => {
    const monday = new Date('2024-01-15');
    const result = formatDayHeader(monday);

    expect(result).toBe('MON 15');
  });

  it('formats Sunday correctly', () => {
    const sunday = new Date('2024-01-21');
    const result = formatDayHeader(sunday);

    expect(result).toBe('SUN 21');
  });
});

describe('formatTime', () => {
  it('formats morning hours correctly', () => {
    expect(formatTime(9)).toBe('9:00 AM');
    expect(formatTime(11)).toBe('11:00 AM');
  });

  it('formats noon correctly', () => {
    expect(formatTime(12)).toBe('12:00 PM');
  });

  it('formats afternoon hours correctly', () => {
    expect(formatTime(14)).toBe('2:00 PM');
    expect(formatTime(23)).toBe('11:00 PM');
  });

  it('formats midnight correctly', () => {
    expect(formatTime(0)).toBe('12:00 AM');
  });
});

describe('getDateAtHour', () => {
  it('returns date with specified hour', () => {
    const date = new Date('2024-01-15');
    const result = getDateAtHour(date, 14);

    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });

  it('preserves the original date', () => {
    const date = new Date('2024-01-15');
    const result = getDateAtHour(date, 14);

    expect(result.getDate()).toBe(15);
    expect(result.getMonth()).toBe(0);
  });
});

describe('isDateInWeek', () => {
  it('returns true for date in week', () => {
    const date = new Date('2024-01-17');
    const week = {
      weekNumber: 3,
      year: 2024,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      days: [],
    };

    expect(isDateInWeek(date, week)).toBe(true);
  });

  it('returns false for date before week', () => {
    const date = new Date('2024-01-10');
    const week = {
      weekNumber: 3,
      year: 2024,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      days: [],
    };

    expect(isDateInWeek(date, week)).toBe(false);
  });

  it('returns false for date after week', () => {
    const date = new Date('2024-01-25');
    const week = {
      weekNumber: 3,
      year: 2024,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      days: [],
    };

    expect(isDateInWeek(date, week)).toBe(false);
  });
});

describe('addWeeks', () => {
  it('adds one week correctly', () => {
    const date = new Date('2024-01-15');
    const result = addWeeks(date, 1);

    expect(result.getDate()).toBe(22);
  });

  it('subtracts one week correctly', () => {
    const date = new Date('2024-01-15');
    const result = addWeeks(date, -1);

    expect(result.getDate()).toBe(8);
  });

  it('handles month boundaries', () => {
    const date = new Date('2024-01-29');
    const result = addWeeks(date, 1);

    expect(result.getMonth()).toBe(1); // February
  });
});

describe('getMonthName', () => {
  it('returns correct month names', () => {
    expect(getMonthName(new Date('2024-01-15'))).toBe('January');
    expect(getMonthName(new Date('2024-06-15'))).toBe('June');
    expect(getMonthName(new Date('2024-12-15'))).toBe('December');
  });
});

describe('getDayName', () => {
  it('returns correct day names', () => {
    expect(getDayName(new Date('2024-01-15'))).toBe('MON'); // Monday
    expect(getDayName(new Date('2024-01-17'))).toBe('WED'); // Wednesday
    expect(getDayName(new Date('2024-01-21'))).toBe('SUN'); // Sunday
  });
});
