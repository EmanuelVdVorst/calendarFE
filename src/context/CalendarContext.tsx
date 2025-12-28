import { createContext, useState, type ReactNode } from 'react';
import type { CalendarEvent, WeekInfo } from '../types/calendar.types';
import { getWeekInfo, addWeeks } from '../utils/date.utils';
import { filterEventsByWeek, filterEventsByDay, sortEventsByStartTime } from '../utils/event.utils';

export interface CalendarContextType {
  currentWeek: WeekInfo;
  events: CalendarEvent[];
  setCurrentWeek: (week: WeekInfo) => void;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  goToToday: () => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventsForWeek: (week: WeekInfo) => CalendarEvent[];
  getEventsForDay: (date: Date) => CalendarEvent[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Sample events for testing
const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    start: new Date(2025, 11, 29, 9, 0),   // Dec 29, 9:00 AM
    end: new Date(2025, 11, 29, 9, 30),    // 9:30 AM
    color: '#FF6B6B'
  },
  {
    id: '2',
    title: 'Design Review',
    start: new Date(2025, 11, 29, 14, 0),  // Dec 29, 2:00 PM
    end: new Date(2025, 11, 29, 15, 30),   // 3:30 PM
    color: '#4ECDC4'
  },
  {
    id: '3',
    title: 'Lunch with Client',
    start: new Date(2025, 11, 30, 12, 0),  // Dec 30, 12:00 PM
    end: new Date(2025, 11, 30, 13, 0),    // 1:00 PM
    color: '#45B7D1'
  }
];

interface CalendarProviderProps {
  children: ReactNode;
}

export function CalendarProvider({ children }: CalendarProviderProps): JSX.Element {
  const [currentWeek, setCurrentWeek] = useState<WeekInfo>(() => getWeekInfo(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>(SAMPLE_EVENTS);

  const goToNextWeek = (): void => {
    const nextWeekDate = addWeeks(currentWeek.startDate, 1);
    setCurrentWeek(getWeekInfo(nextWeekDate));
  };

  const goToPreviousWeek = (): void => {
    const prevWeekDate = addWeeks(currentWeek.startDate, -1);
    setCurrentWeek(getWeekInfo(prevWeekDate));
  };

  const goToToday = (): void => {
    setCurrentWeek(getWeekInfo(new Date()));
  };

  const addEvent = (event: Omit<CalendarEvent, 'id'>): void => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const updateEvent = (id: string, eventUpdate: Partial<CalendarEvent>): void => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? { ...event, ...eventUpdate } : event
      )
    );
  };

  const deleteEvent = (id: string): void => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const getEventsForWeek = (week: WeekInfo): CalendarEvent[] => {
    return filterEventsByWeek(events, week);
  };

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return sortEventsByStartTime(filterEventsByDay(events, date));
  };

  const value: CalendarContextType = {
    currentWeek,
    events,
    setCurrentWeek,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForWeek,
    getEventsForDay,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
