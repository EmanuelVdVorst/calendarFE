import type { CalendarEvent } from '../../types/calendar.types';

export interface TimeGridProps {
  onSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
}
