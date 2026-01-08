import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { CalendarEvent, WeekInfo } from '../types/calendar.types';
import { getWeekInfo, addWeeks } from '../utils/date.utils';
import { filterEventsByWeek, filterEventsByDay, sortEventsByStartTime } from '../utils/event.utils';
import { eventsApi } from '../api/events.api';

export interface CalendarContextType {
  currentWeek: WeekInfo;
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  setCurrentWeek: (week: WeekInfo) => void;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  goToToday: () => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventsForWeek: (week: WeekInfo) => CalendarEvent[];
  getEventsForDay: (date: Date) => CalendarEvent[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface CalendarProviderProps {
  children: ReactNode;
}

export function CalendarProvider({ children }: CalendarProviderProps): JSX.Element {
  const [currentWeek, setCurrentWeek] = useState<WeekInfo>(() => getWeekInfo(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load events from API on mount
  useEffect(() => {
    const loadEvents = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const fetchedEvents = await eventsApi.getAll();
        setEvents(fetchedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadEvents();
  }, []);

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

  const addEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<void> => {
    try {
      const newEvent = await eventsApi.create(event);
      setEvents(prevEvents => [...prevEvents, newEvent]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add event');
      console.error('Failed to add event:', err);
      throw err;
    }
  };

  const updateEvent = async (id: string, eventUpdate: Partial<CalendarEvent>): Promise<void> => {
    try {
      const updatedEvent = await eventsApi.update(id, eventUpdate);
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? updatedEvent : event
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
      console.error('Failed to update event:', err);
      throw err;
    }
  };

  const deleteEvent = async (id: string): Promise<void> => {
    try {
      await eventsApi.delete(id);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
      console.error('Failed to delete event:', err);
      throw err;
    }
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
    loading,
    error,
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
