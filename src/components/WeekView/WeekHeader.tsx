import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { getDayName, isToday } from '../../utils/date.utils';

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  border-bottom: 1px solid #E0E0E0;
  background-color: #FAFAFA;
`;

const TimeColumn = styled.div`
  padding: 12px 8px;
  font-size: 12px;
  color: #666;
  border-right: 1px solid #E0E0E0;
`;

interface DayHeaderProps {
  $isToday: boolean;
}

const DayHeader = styled.div<DayHeaderProps>`
  padding: 12px;
  text-align: center;
  border-right: 1px solid #E0E0E0;
  background-color: ${props => props.$isToday ? '#E3F2FD' : 'transparent'};

  &:last-child {
    border-right: none;
  }
`;

const DayName = styled.div<DayHeaderProps>`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$isToday ? '#007AFF' : '#666'};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DayNumber = styled.div<DayHeaderProps>`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.$isToday ? '#007AFF' : '#000'};
`;

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
