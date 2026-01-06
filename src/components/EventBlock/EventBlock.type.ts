import type { CalendarEvent } from '../../types/calendar.types';

export interface EventBlockProps {
  event: CalendarEvent;
  top: number;
  height: number;
  column: number;
  onClick: (event: CalendarEvent) => void;
}
