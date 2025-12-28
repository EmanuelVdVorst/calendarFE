export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

export interface EventFormData {
  title: string;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  date: Date;
}

export interface WeekInfo {
  weekNumber: number;
  year: number;
  startDate: Date;  // Monday
  endDate: Date;    // Sunday
  days: Date[];     // Array of 7 dates (Mon-Sun)
}

export interface TimeSlot {
  date: Date;
  hour: number;
}

export interface DayColumn {
  date: Date;
  dayName: string;  // MON, TUE, etc.
  dayNumber: number;
  isToday: boolean;
}

export interface EventPosition {
  event: CalendarEvent;
  top: number;      // Position in pixels or percentage
  height: number;   // Height in pixels or percentage
  column: number;   // 0-6 (Mon-Sun)
}
