import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { getMonthName, isToday, isDateInWeek } from '../../utils/date.utils';

const MiniCalendarContainer = styled.div`
  margin-bottom: 24px;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 12px;
`;

const MonthHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 12px;
  text-align: center;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: #666;
  text-align: center;
  padding: 4px 0;
  text-transform: uppercase;
`;

interface DayCellProps {
  $isToday: boolean;
  $isInCurrentWeek: boolean;
  $isCurrentMonth: boolean;
}

const DayCell = styled.div<DayCellProps>`
  font-size: 12px;
  text-align: center;
  padding: 6px 0;
  border-radius: 4px;
  cursor: pointer;
  color: ${props => props.$isCurrentMonth ? '#000' : '#CCC'};
  background-color: ${props => {
    if (props.$isToday) {
return '#007AFF';
}
    if (props.$isInCurrentWeek) {
return '#E3F2FD';
}
    return 'transparent';
  }};
  font-weight: ${props => props.$isToday ? '600' : 'normal'};

  &:hover {
    background-color: ${props => props.$isToday ? '#0051D5' : '#F0F0F0'};
  }
`;

function MiniCalendar(): JSX.Element {
  const { currentWeek } = useCalendar();

  const currentDate = currentWeek.startDate;
  const monthName = getMonthName(currentDate);
  const year = currentDate.getFullYear();

  // Get first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Calculate days to show (including padding)
  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday
  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1; // Convert to Mon=0, Sun=6

  const daysInMonth = lastDayOfMonth.getDate();
  const totalCells = Math.ceil((daysInMonth + adjustedStartDay) / 7) * 7;

  const days: Date[] = [];
  for (let i = 0; i < totalCells; i++) {
    const day = new Date(firstDayOfMonth);
    day.setDate(1 - adjustedStartDay + i);
    days.push(day);
  }

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <MiniCalendarContainer>
      <MonthHeader>
        {monthName} {year}
      </MonthHeader>
      <DaysGrid>
        {dayLabels.map((label) => (
          <DayLabel key={`label-${label}`}>{label}</DayLabel>
        ))}
        {days.map((day) => {
          const dayIsToday = isToday(day);
          const isInCurrentWeek = isDateInWeek(day, currentWeek);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <DayCell
              key={day.toISOString()}
              $isToday={dayIsToday}
              $isInCurrentWeek={isInCurrentWeek}
              $isCurrentMonth={isCurrentMonth}
            >
              {day.getDate()}
            </DayCell>
          );
        })}
      </DaysGrid>
    </MiniCalendarContainer>
  );
}

export default MiniCalendar;
