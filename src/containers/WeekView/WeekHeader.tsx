import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { getDayName, isToday } from '../../utils/date.utils';

const HeaderContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: '60px repeat(7, 1fr)',
  borderBottom: '1px solid #E0E0E0',
  backgroundColor: '#FAFAFA',
});

const TimeColumn = styled.div({
  padding: '12px 8px',
  fontSize: '12px',
  color: '#666',
  borderRight: '1px solid #E0E0E0',
});

interface DayHeaderProps {
  $isToday: boolean;
}

const DayHeader = styled.div<DayHeaderProps>((props) => ({
  padding: '12px',
  textAlign: 'center',
  borderRight: '1px solid #E0E0E0',
  backgroundColor: props.$isToday ? '#E3F2FD' : 'transparent',

  '&:last-child': {
    borderRight: 'none',
  },
}));

const DayName = styled.div<DayHeaderProps>((props) => ({
  fontSize: '11px',
  fontWeight: 600,
  color: props.$isToday ? '#007AFF' : '#666',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const DayNumber = styled.div<DayHeaderProps>((props) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: props.$isToday ? '#007AFF' : '#000',
}));

function WeekHeader(): JSX.Element {
  const { currentWeek } = useCalendar();

  return (
    <HeaderContainer>
      <TimeColumn />
      {currentWeek.days.map((day) => {
        const dayIsToday = isToday(day);
        const dayName = getDayName(day);
        const dayNumber = day.getDate();

        return (
          <DayHeader key={day.toISOString()} $isToday={dayIsToday}>
            <DayName $isToday={dayIsToday}>{dayName}</DayName>
            <DayNumber $isToday={dayIsToday}>{dayNumber}</DayNumber>
          </DayHeader>
        );
      })}
    </HeaderContainer>
  );
}

export default WeekHeader;
