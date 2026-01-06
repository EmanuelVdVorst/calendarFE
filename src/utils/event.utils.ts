import type { CalendarEvent, EventFormData, EventPosition, WeekInfo } from '../types/calendar.types';
import { isSameDay, isDateInWeek } from './date.utils';
import { weekGrid } from '../components/basics/Styles';

export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function filterEventsByDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    // Check if event starts on this day or spans across this day
    return isSameDay(eventStart, date) ||
           (eventStart < date && eventEnd > date);
  });
}

export function filterEventsByWeek(events: CalendarEvent[], week: WeekInfo): CalendarEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.start);
    return isDateInWeek(eventDate, week);
  });
}

export function sortEventsByStartTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function calculateEventPosition(
  event: CalendarEvent
): EventPosition {
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);

  // Calculate which column (day of week, 0 = Monday)
  const dayOfWeek = eventStart.getDay();
  const column = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Mon=0, Sun=6

  // Calculate top position (based on hour and minutes)
  const startHour = eventStart.getHours();
  const startMinutes = eventStart.getMinutes();
  const startTimeInHours = startHour + (startMinutes / 60);

  // Use grid configuration from constants
  const hourHeight = parseInt(weekGrid.slotHeight);
  const top = (startTimeInHours - weekGrid.startHour) * hourHeight;

  // Calculate height (duration in hours)
  const durationMs = eventEnd.getTime() - eventStart.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  const height = durationHours * hourHeight;

  return {
    event,
    top,
    height,
    column,
  };
}

export function isEventInSlot(
  event: CalendarEvent,
  date: Date,
  hour: number
): boolean {
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);

  const slotStart = new Date(date);
  slotStart.setHours(hour, 0, 0, 0);

  const slotEnd = new Date(date);
  slotEnd.setHours(hour + 1, 0, 0, 0);

  // Check if event overlaps with this slot
  return eventStart < slotEnd && eventEnd > slotStart;
}

export function createEventFromFormData(
  formData: EventFormData,
  color: string
): Omit<CalendarEvent, 'id'> {
  const { title, startTime, endTime, date } = formData;

  // Parse time strings (HH:mm format)
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const start = new Date(date);
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date(date);
  end.setHours(endHour, endMinute, 0, 0);

  return {
    title,
    start,
    end,
    color,
  };
}

export function validateEventTimes(
  startTime: string,
  endTime: string
): { valid: boolean; error?: string } {
  if (!startTime || !endTime) {
    return { valid: false, error: 'Start and end times are required' };
  }

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  if (endInMinutes <= startInMinutes) {
    return { valid: false, error: 'End time must be after start time' };
  }

  return { valid: true };
}

export function getRandomEventColor(): string {
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Orange
    '#98D8C8', // Mint
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function formatEventTime(event: CalendarEvent): string {
  const start = new Date(event.start);
  const end = new Date(event.end);

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    let displayHour = hours;
    if (hours === 0) {
      displayHour = 12;
    } else if (hours > 12) {
      displayHour = hours - 12;
    }
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHour}:${displayMinutes} ${period}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
}
