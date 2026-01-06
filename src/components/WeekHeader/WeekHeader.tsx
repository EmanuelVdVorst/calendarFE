import type { ReactElement } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { getDayName, isToday } from '../../utils/date.utils';
import { DayHeaderCell } from '../basics/Calendar';
import { HeaderContainer, TimeColumn } from './WeekHeader.style';

export function WeekHeader(): ReactElement {
  const { currentWeek } = useCalendar();

  return (
    <HeaderContainer>
      <TimeColumn />
      {currentWeek.days.map((day) => {
        const dayIsToday = isToday(day);
        const dayName = getDayName(day);
        const dayNumber = day.getDate();

        return (
          <DayHeaderCell
            key={day.toISOString()}
            dayName={dayName}
            dayNumber={dayNumber}
            isToday={dayIsToday}
          />
        );
      })}
    </HeaderContainer>
  );
}
