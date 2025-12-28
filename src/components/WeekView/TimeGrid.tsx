import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { formatTime } from '../../utils/date.utils';
import { calculateEventPosition } from '../../utils/event.utils';
import TimeSlot from './TimeSlot';
import EventBlock from './EventBlock';

interface TimeGridProps {
  onSlotClick: (date: Date, hour: number) => void;
}

const GridWrapper = styled.div`
  position: relative;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  position: relative;
  background-color: #FFFFFF;
`;

const TimeLabel = styled.div`
  height: 60px;
  padding: 8px;
  font-size: 12px;
  color: #666;
  border-right: 1px solid #E0E0E0;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  background-color: #FAFAFA;
`;

const GRID_START_HOUR = 8;
const GRID_END_HOUR = 18;

function TimeGrid({ onSlotClick }: TimeGridProps): JSX.Element {
  const { currentWeek, getEventsForWeek } = useCalendar();

  // Generate hours from 8 AM to 6 PM
  const hours = Array.from(
    { length: GRID_END_HOUR - GRID_START_HOUR },
    (_, i) => GRID_START_HOUR + i
  );

  // Get events for current week
  const weekEvents = getEventsForWeek(currentWeek);

  return (
    <GridWrapper>
      <GridContainer>
        {hours.map(hour => (
          <div key={`hour-${hour}`} style={{ display: 'contents' }}>
            <TimeLabel>{formatTime(hour)}</TimeLabel>
            {currentWeek.days.map((day) => (
              <TimeSlot
                key={`slot-${hour}-${day.toISOString()}`}
                date={day}
                hour={hour}
                onClick={onSlotClick}
              />
            ))}
          </div>
        ))}
      </GridContainer>
      {/* Render events as positioned blocks */}
      {weekEvents.map(event => {
        const position = calculateEventPosition(event);
        return (
          <EventBlock
            key={event.id}
            event={event}
            top={position.top}
            height={position.height}
            column={position.column}
          />
        );
      })}
    </GridWrapper>
  );
}

export default TimeGrid;
