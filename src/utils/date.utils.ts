import type { WeekInfo } from '../types/calendar.types';

export function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust when Sunday (0), else Monday is day 1
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function getEndOfWeek(date: Date): Date {
  const startOfWeek = getStartOfWeek(date);
  const sunday = new Date(startOfWeek);
  sunday.setDate(startOfWeek.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
}

export function getWeekDays(startDate: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }
  return days;
}

export function getWeekNumber(date: Date): number {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  // Set to nearest Thursday (current date + 4 - current day number)
  // Make Sunday's day number 7
  target.setDate(target.getDate() + 4 - (target.getDay() || 7));

  // Get first day of year
  const yearStart = new Date(target.getFullYear(), 0, 1);

  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

  return weekNumber;
}

export function getWeekInfo(date: Date): WeekInfo {
  const startDate = getStartOfWeek(date);
  const endDate = getEndOfWeek(date);
  const days = getWeekDays(startDate);
  const weekNumber = getWeekNumber(date);
  const year = startDate.getFullYear();

  return {
    weekNumber,
    year,
    startDate,
    endDate,
    days,
  };
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function formatDayHeader(date: Date): string {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayName = dayNames[date.getDay()];
  const dayNumber = date.getDate();
  return `${dayName} ${dayNumber}`;
}

export function formatTime(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  let displayHour = hour;
  if (hour === 0) {
    displayHour = 12;
  } else if (hour > 12) {
    displayHour = hour - 12;
  }
  return `${displayHour}:00 ${period}`;
}

export function getDateAtHour(date: Date, hour: number): Date {
  const newDate = new Date(date);
  newDate.setHours(hour, 0, 0, 0);
  return newDate;
}

export function isDateInWeek(date: Date, week: WeekInfo): boolean {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  const start = new Date(week.startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(week.endDate);
  end.setHours(23, 59, 59, 999);

  return checkDate >= start && checkDate <= end;
}

export function addWeeks(date: Date, weeks: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + (weeks * 7));
  return newDate;
}

export function getMonthName(date: Date): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[date.getMonth()];
}

export function getDayName(date: Date): string {
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const day = date.getDay();
  // Convert to Mon=0, Sun=6
  const adjustedDay = day === 0 ? 6 : day - 1;
  return dayNames[adjustedDay];
}
