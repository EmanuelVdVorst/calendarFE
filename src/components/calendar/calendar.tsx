import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { getMonthName, isToday, isDateInWeek } from '../../utils/date.utils';
import { margins, colors, borderRadius, fonts, paddings } from '../basics/Styles';

const MiniCalendarContainer = styled.div({
  marginBottom: paddings.medium,
  backgroundColor: colors.white,
  borderRadius: borderRadius.medium,
  padding: margins.medium,
});

const MonthHeader = styled.div({
  fontSize: fonts.size.medium,
  fontWeight: fonts.weight.medium,
  color: colors.black,
  marginBottom: margins.medium,
  textAlign: 'center',
});

const DaysGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: margins.xxsmall,
});

const DayLabel = styled.div({
  fontSize: fonts.size.small,
  fontWeight: fonts.weight.medium,
  color: colors.gray,
  textAlign: 'center',
  padding: `${margins.xxsmall} 0`,
  textTransform: 'uppercase',
});

interface DayCellProps {
  $isToday: boolean;
  $isInCurrentWeek: boolean;
  $isCurrentMonth: boolean;
}

const DayCell = styled.div<DayCellProps>((props) => {
  const getBackgroundColor = (): string => {
    if (props.$isToday) {
      return colors.primairy;
    }
    if (props.$isInCurrentWeek) {
      return colors.secondaryHover;
    }
    return 'transparent';
  };

  return {
    fontSize: fonts.size.small,
    textAlign: 'center',
    padding: `${margins.xxsmall} 0`,
    borderRadius: margins.xxsmall,
    cursor: 'pointer',
    color: props.$isCurrentMonth ? colors.black : colors.lightGray,
    backgroundColor: getBackgroundColor(),
    fontWeight: props.$isToday ? fonts.weight.medium : fonts.weight.small,

    '&:hover': {
      backgroundColor: props.$isToday ? colors.primairyHover : colors.secondaryHover,
    },
  };
});

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

export { MiniCalendar };
